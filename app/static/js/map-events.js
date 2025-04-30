// map-events.js
import { removeUnwantedLayers } from './layers-control.js';
import { logMapLayers } from './traffic-logger.js';
import { initTrafficOverlay } from './traffic-visualizer.js';
import { actualizarLucesPorTrafico } from './traffic-density.js';
import { initLayerToggleMenu } from './layer-toggle.js';

export function initMapEvents(map) {
  map.on('load', () => {
    removeUnwantedLayers(map);
    logMapLayers(map);
    initTrafficOverlay(map);
    actualizarLucesPorTrafico(map);
    setInterval(() => actualizarLucesPorTrafico(map), 10000);
    initLayerToggleMenu(map);
  });

  map.on('zoom', () => {
    actualizarLucesPorTrafico(map);
  });
}
