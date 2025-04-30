mapboxgl.accessToken = 'pk.eyJ1Ijoib21lcnV4MzIiLCJhIjoiY205cmI2ampiMWNjMzJscHo4MDNibzMwaCJ9.J9ioizrRkVYVwZCWVoDFBw';
export const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/traffic-day-v2',
  center: [-99.1332, 19.4326],
  zoom: 11
});

