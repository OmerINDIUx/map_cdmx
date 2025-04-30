export function initLayerToggleMenu(map) {
  const layers = [
    { id: 'gtfs-routes-layer', name: 'Rutas' },
    { id: 'gtfs-stops-layer', name: 'Paradas' },
    { id: 'gtfs-shapes-layer', name: 'Shapes' }
  ];

  const container = document.getElementById('layerMenu');
  if (!container) return;

  layers.forEach(layer => {
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = true;
    checkbox.onchange = () => {
      const visibility = checkbox.checked ? 'visible' : 'none';
      if (map.getLayer(layer.id)) {
        map.setLayoutProperty(layer.id, 'visibility', visibility);
      }
    };
    label.appendChild(checkbox);
    label.append(` ${layer.name}`);
    container.appendChild(label);
    container.appendChild(document.createElement('br'));
  });

  const toggleButton = document.getElementById('toggleLayers');
  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      const visibility = map.getLayoutProperty('gtfs-shapes-layer', 'visibility');
      map.setLayoutProperty('gtfs-shapes-layer', 'visibility', visibility === 'visible' ? 'none' : 'visible');
    });
  }
  
}

export function toggleRouteLayer() {
  console.log("Opción seleccionada:", document.getElementById('routeSelector').value);
  const selectedRoute = document.getElementById('routeSelector').value;

  if (selectedRoute === 'all') {
    map.setLayoutProperty('gtfs-shapes-layer', 'visibility', 'visible');
  } else {
    const filter = [
      '==', ['get', 'route_type'], getRouteTypeId(selectedRoute)
    ];
    map.setFilter('gtfs-shapes-layer', filter);
  }
}



function getRouteTypeId(routeType) {
  const routeTypes = {
    'suburban_train': 0,  // Tren suburbano
    'metro': 1,           // Metro
    'bus': 3,             // Autobús
    'ferry': 4,           // Ferry
    'tram': 5,            // Tranvía
    'cable_car': 6        // Cable aéreo
  };
  return routeTypes[routeType] || null;  // Devuelve el tipo de ruta correspondiente

}
export function toggleLayerMenu() {
  const options = document.getElementById('layer-toggle-options');
  options.style.display = (options.style.display === 'block') ? 'none' : 'block';
}

  
  

// layer-toggle.js
import { map } from './map-init.js';


  
