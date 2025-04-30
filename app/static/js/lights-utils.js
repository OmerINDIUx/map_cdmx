export function calcularLucesPorTrafico(densidad) {
    const maxLights = 200;
    const minLights = 10;
    return Math.round(minLights + (maxLights - minLights) * densidad);
  }
  
  export function calcularVelocidad(densidad) {
    return 0.2 + (1 - densidad) * 1.5;
  }