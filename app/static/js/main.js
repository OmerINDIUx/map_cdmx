import { map } from './map-init.js';
import { initMapEvents } from './map-events.js';
import { llenarFrequenciesTable, createFrequencyChart } from './frequencies.js';



import { toggleLayerMenu } from './layer-toggle.js';
window.toggleLayerMenu = toggleLayerMenu;

import { toggleRouteLayer } from './layer-toggle.js';
window.toggleRouteLayer = toggleRouteLayer;
document.getElementById('routeSelector').addEventListener('change', toggleRouteLayer);

initMapEvents(map);

// Esperar a que el DOM esté listo
window.addEventListener('DOMContentLoaded', () => {
  const uploadBtn = document.getElementById('uploadButton');
  const fileInput = document.getElementById('gtfsFile');
  
  if (uploadBtn) {
    uploadBtn.addEventListener('click', () => {
      const formData = new FormData();
      const file = fileInput.files[0];
      
      if (file) {
        formData.append('file', file);
        
        fetch('/upload_gtfs', {
          method: 'POST',
          body: formData,
        })
        .then(response => response.json())
        .then(data => {
          // Mapa de las rutas
          map.addSource('shapes', {
            type: 'geojson',
            data: data.shapes
          });
          // Mapa de las paradas
          map.addSource('stops', {
            type: 'geojson',
            data: data.stops
          });
          // Mapa de frecuencias (si se desea mostrar)

          if (data.frequencies && Array.isArray(data.frequencies)) {
            data.frequencies.forEach(freq => {
              console.log(freq);
            });
          }
        })
        .catch(error => console.error('Error al cargar el GTFS:', error));
      } else {
        console.error('Por favor, selecciona un archivo GTFS.');
      }
    });
  }
});
