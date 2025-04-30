export function obtenerLineasDeTrafico(map) {
  const allLayers = map.getStyle().layers;

  // Filtrar capas que empiezan con 'traffic-'
  const trafficLayerIds = allLayers
    .filter(layer => layer.id.startsWith('traffic-'))
    .map(layer => layer.id);

  // Consultar las features en esas capas
  const features = map.queryRenderedFeatures({ layers: trafficLayerIds });

  // Filtrar solo aquellas con geometría tipo LineString
  return features.filter(f => f.geometry.type === 'LineString');
}
