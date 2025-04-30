
// Función para inicializar el contenedor SVG en el mapa.
export function initTrafficOverlay(map) {
    const container = map.getContainer();
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('id', 'svg-overlay');
    svg.style.position = 'absolute';
    svg.style.top = 0;
    svg.style.left = 0;
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.pointerEvents = 'none';
    container.appendChild(svg);
  }
  