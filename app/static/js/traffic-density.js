import { calcularLucesPorTrafico, calcularVelocidad } from './lights-utils.js';
import { animarLuces } from './lights-animation.js';

const capasDeTrafico = [
  'traffic-rd-primary',
];

export function actualizarLucesPorTrafico(map) {
  const features = map.queryRenderedFeatures({ layers: capasDeTrafico });
  const densidad = Math.min(1, features.length / 500);

  const lineas = features.map(f => {
    const coords = f.geometry.coordinates;

    const puntos = coords.flat().map(coord => {
      if (Array.isArray(coord) && coord.length === 2) {
        const lngLat = new mapboxgl.LngLat(coord[0], coord[1]);
        const p = map.project(lngLat);
        return { x: p.x, y: p.y };
      } else {
        return null;
      }
    }).filter(p => p !== null);

    return { points: puntos };
  });

  const numLuces = calcularLucesPorTrafico(densidad);
  const velocidad = calcularVelocidad(densidad);

  console.log("Líneas actualizadas para animar:", lineas);

  animarLuces(lineas, numLuces, velocidad);
}
