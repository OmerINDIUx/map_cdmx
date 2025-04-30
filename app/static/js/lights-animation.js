const canvas = document.getElementById('canvas-luces');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



export function animarLuces(lineas, numLuces, velocidad) {
  const canvas = document.getElementById('canvas-luces');
  if (!canvas) {
    console.error("Canvas con id 'canvas-luces' no encontrado.");
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error("No se pudo obtener el contexto 2D del canvas.");
    return;
  }

  const luces = [];

  for (let i = 0; i < numLuces; i++) {
    const linea = lineas[i % lineas.length];
    if (!linea || linea.points.length < 2) continue;

    luces.push({
      linea: linea.points,
      pos: 0,
      t: Math.random(),
    });
  }

  function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    luces.forEach(luz => {
      const { linea, pos, t } = luz;
      if (pos >= linea.length - 1) {
        luz.pos = 0;
        luz.t = 0;
        return;
      }

      const p0 = linea[luz.pos];
      const p1 = linea[luz.pos + 1];

      const x = p0.x + (p1.x - p0.x) * t;
      const y = p0.y + (p1.y - p0.y) * t;

      ctx.beginPath();
      ctx.arc(x, y, 2, 0, 2 * Math.PI);
      ctx.fillStyle = 'blue';
      ctx.fill();

      luz.t += velocidad;
      if (luz.t >= 1) {
        luz.pos++;
        luz.t = 0;
      }
    });

    requestAnimationFrame(animar);
  }

  animar();
}
