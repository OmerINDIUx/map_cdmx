export function logMapLayers(map) {
    const layers = map.getStyle().layers.filter(layer => layer.id === 'traffic');
    console.log(layers); // Verifica si la capa de tráfico está incluida
    fetch('/save-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(layers)
    });
  }
  