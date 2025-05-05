from flask import Flask, render_template, request, jsonify
import os, zipfile
import pandas as pd
import geojson
from werkzeug.utils import secure_filename


# --- Configuración inicial ---
template_dir = os.path.join(os.path.dirname(__file__), 'app', 'templates')
static_dir = os.path.join(os.path.dirname(__file__), 'app', 'static')
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')

app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload_gtfs', methods=['POST'])
def upload_gtfs():
    file = request.files['file']
    filename = secure_filename(file.filename)
    zip_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(zip_path)

    # --- Extraer el ZIP ---
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(UPLOAD_FOLDER)

    geojson_result = {}

    # --- SHAPES ---
    shapes_path = os.path.join(UPLOAD_FOLDER, 'shapes.txt')
    trips_path = os.path.join(UPLOAD_FOLDER, 'trips.txt')
    routes_path = os.path.join(UPLOAD_FOLDER, 'routes.txt')

    shape_features = []
    if os.path.exists(shapes_path) and os.path.exists(trips_path) and os.path.exists(routes_path):
        shapes_df = pd.read_csv(shapes_path)
        trips_df = pd.read_csv(trips_path)
        routes_df = pd.read_csv(routes_path)

        shape_routes = trips_df[['trip_id', 'route_id', 'shape_id']].merge(
            routes_df[['route_id', 'route_type']], on='route_id', how='left'
        ).drop_duplicates('shape_id')

        shapes_df = shapes_df.merge(shape_routes[['shape_id', 'route_type']], on='shape_id', how='left')

        for shape_id, group in shapes_df.groupby('shape_id'):
            coords = list(zip(group['shape_pt_lon'], group['shape_pt_lat']))
            route_type = int(group['route_type'].iloc[0]) if pd.notna(group['route_type'].iloc[0]) else 3
            feature = geojson.Feature(
                geometry=geojson.LineString(coords),
                properties={'shape_id': shape_id, 'route_type': route_type}
            )
            shape_features.append(feature)

    geojson_result['shapes'] = geojson.FeatureCollection(shape_features)




    # --- STOPS ---
    stops_path = os.path.join(UPLOAD_FOLDER, 'stops.txt')
    stop_features = []
    if os.path.exists(stops_path):
        stops_df = pd.read_csv(stops_path)
        for _, row in stops_df.iterrows():
            coords = [row['stop_lon'], row['stop_lat']]
            props = {
                'stop_id': row['stop_id'],
                'stop_name': row['stop_name']
            }
            feature = geojson.Feature(
                geometry=geojson.Point(coords),
                properties=props
            )
            stop_features.append(feature)
    # --- comentario pueb OMER ---

    geojson_result['stops'] = geojson.FeatureCollection(stop_features)

    # --- FREQUENCIES ---
    frequencies_path = os.path.join(UPLOAD_FOLDER, 'frequencies.txt')
    if os.path.exists(frequencies_path):
        frequencies_df = pd.read_csv(frequencies_path)
        geojson_result['frequencies'] = frequencies_df.to_dict(orient='records')
    else:
        geojson_result['frequencies'] = []

    # --- CALENDAR ---
    calendar_path = os.path.join(UPLOAD_FOLDER, 'calendar.txt')
    if os.path.exists(calendar_path):
        calendar_df = pd.read_csv(calendar_path)
        geojson_result['calendar'] = calendar_df.to_dict(orient='records')
    else:
        geojson_result['calendar'] = []

    # --- STOP_TIMES ---
    stop_times_path = os.path.join(UPLOAD_FOLDER, 'stop_times.txt')
    stop_times_features = []
    if os.path.exists(stop_times_path):
        stop_times_df = pd.read_csv(stop_times_path)
        if 'stops_df' not in locals():
            stops_df = pd.read_csv(stops_path)

        stop_coords = stops_df.set_index('stop_id')[['stop_lon', 'stop_lat']].to_dict('index')

        for trip_id, group in stop_times_df.groupby('trip_id'):
            group = group.sort_values('stop_sequence')
            coords = []
            for stop_id in group['stop_id']:
                if stop_id in stop_coords:
                    coord = [stop_coords[stop_id]['stop_lon'], stop_coords[stop_id]['stop_lat']]
                    coords.append(coord)
            if coords:
                feature = geojson.Feature(
                    geometry=geojson.LineString(coords),
                    properties={'trip_id': trip_id}
                )
                stop_times_features.append(feature)

    geojson_result['stop_times'] = geojson.FeatureCollection(stop_times_features)

    # --- Respuesta JSON ---
    return jsonify(geojson_result)

from flask import request

@app.route('/save-log', methods=['POST'])
def save_log():
    data = request.get_json()
    print('Datos recibidos en save-log:', data)
    return 'OK', 200  # <-- ¡Aquí aseguramos regresar algo!


if __name__ == '__main__':
    app.run(debug=True, port=8080)
