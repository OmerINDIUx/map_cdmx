import { map } from './map-init.js';

export function uploadGTFS() {
  const input = document.getElementById('gtfsFile');
  const file = input.files[0];
  if (!file) return alert('Selecciona un archivo .zip de GTFS primero');

  if (!file.name.endsWith('.zip')) {
    return alert('El archivo debe tener extensión .zip y contener datos GTFS válidos');
  }

  const formData = new FormData();
  formData.append('file', file);

  const statusEl = document.getElementById('uploadStatus');
  if (statusEl) statusEl.textContent = 'Cargando GTFS...';

  fetch('/upload_gtfs', {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      if (statusEl) statusEl.textContent = 'GTFS cargado correctamente';

      // Mostrar JSON crudo (opcional)
      if (data.readable) {
        document.getElementById('output').textContent = data.readable;
      }

      // --- Actualizar Shapes ---
      if (data.shapes && typeof data.shapes === 'object') {
        if (!map.getSource('gtfs-shapes')) {
          map.addSource('gtfs-shapes', {
            type: 'geojson',
            data: data.shapes
          });
          map.addLayer({
            id: 'gtfs-shapes-layer',
            type: 'line',
            source: 'gtfs-shapes',
            paint: {
              'line-color': '#1E90FF',
              'line-width': 3,
              'line-opacity': 1
            }
          });
        } else {
          map.getSource('gtfs-shapes').setData(data.shapes);
        }
      }

      // --- Actualizar Stops ---
      if (data.stops && typeof data.stops === 'object') {
        if (!map.getSource('gtfs-stops')) {
          map.addSource('gtfs-stops', {
            type: 'geojson',
            data: data.stops
          });
          map.addLayer({
            id: 'gtfs-stops-layer',
            type: 'circle',
            source: 'gtfs-stops',
            paint: {
              'circle-radius': 4,
              'circle-color': '#FF4136'
            }
          });
        } else {
          map.getSource('gtfs-stops').setData(data.stops);
        }
      }

      // --- Llenar las tablas ---
      if (data.calendar && Array.isArray(data.calendar)) llenarCalendarTable(data.calendar);
      if (data.frequencies && Array.isArray(data.frequencies)) llenarFrequenciesTable(data.frequencies);
      if (data.stop_times && Array.isArray(data.stop_times)) llenarStopTimesTable(data.stop_times);

      console.log('GTFS cargado y desplegado correctamente');
    })
    .catch(err => {
      console.error('Error al subir GTFS:', err);
      if (statusEl) statusEl.textContent = 'Error al subir el archivo GTFS';
      alert('Hubo un error al subir el archivo GTFS');
    });
}

// Funciones auxiliares
function llenarCalendarTable(calendar) {
  const tbody = document.getElementById('calendar-data');
  tbody.innerHTML = '';
  calendar.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.service_id}</td>
      <td>${item.monday}</td>
      <td>${item.tuesday}</td>
      <td>${item.wednesday}</td>
      <td>${item.thursday}</td>
      <td>${item.friday}</td>
      <td>${item.saturday}</td>
      <td>${item.sunday}</td>
      <td>${item.start_date}</td>
      <td>${item.end_date}</td>
    `;
    tbody.appendChild(tr);
  });
}

function llenarFrequenciesTable(frequencies) {
  const tbody = document.getElementById('frequencies-data');
  tbody.innerHTML = '';
  frequencies.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.trip_id}</td>
      <td>${item.headway_secs}</td>
    `;
    tbody.appendChild(tr);
  });
}

function llenarStopTimesTable(stopTimes) {
  const tbody = document.getElementById('stop-times-data');
  tbody.innerHTML = '';

  if (stopTimes.length === 0) {
    console.log("No hay datos de horarios de paradas.");
    return;
  }

  stopTimes.forEach(item => {
    console.log(item); // Verifica el contenido de cada item en stopTimes

    if (item.trip_id && item.start_time && item.end_time && item.headway_secs) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${item.trip_id}</td>
        <td>${item.start_time}</td>
        <td>${item.end_time}</td>
        <td>${item.headway_secs}</td>
      `;
      tbody.appendChild(tr);
    } else {
      console.error("Falta información en el item:", item);
    }
    console.log(data.stop_times);  // Para verificar los datos antes de pasar a la función
    if (data.stop_times && Array.isArray(data.stop_times)) llenarStopTimesTable(data.stop_times);
  });
}
