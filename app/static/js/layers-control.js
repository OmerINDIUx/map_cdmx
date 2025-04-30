export function removeUnwantedLayers(map) {
    const capasAEliminar = [
      // 🛣️ Calles menores
      'road-secondary',         // Calle secundaria
      'road-tertiary',          // Calle terciaria
      'road-tertiary-case',     // Variante de calle terciaria (bordes o resaltado)
      'road-minor',             // Calle menor
      'road-minor-case',        // Variante de calle menor

      // 🏘️ Colonias y lugares
      'place-neighbourhood',    // Vecindario o colonia
      'place-suburb',           // Suburbio o fraccionamiento
      'place-locality',         // Localidad
      'place-label',            // Etiquetas generales de lugares

      // 🏞️ Relieve y terreno
      'hillshade',              // Sombras del relieve
      'hillshade-shadow',       // Sombras profundas del relieve
      'hillshade-highlight',    // Áreas iluminadas del relieve
      'contour',                // Líneas de contorno
      'terrain',                // Representación general del terreno
      'landform-shadow',        // Sombras de la forma del terreno
      'hillshade-label',        // Etiquetas del relieve

      // 🚇 Transporte público
      'transit-label',          // Etiquetas de transporte
      'station-label',          // Nombre de estaciones
      'rail-station',           // Estación de tren
      'railway',                // Vías de tren
      'rail',                   // Rieles

      // 🏥 Lugares de interés público
      'national_park',          // Parque nacional
      'background',             // Fondo base del mapa
      'school',                 // Escuela
      'hospital',               // Hospital
      'park-cemetery-pitch',    // Parques, cementerios, canchas deportivas
      'airport',                // Aeropuerto
      'parking',                // Estacionamiento

      // 💧 Agua
      'hillshade_highlight_bright', // Relieve iluminado brillante
      'hillshade_highlight_med',    // Relieve iluminado medio
      'hillshade_shadow_faint',     // Sombra suave
      'hillshade_shadow_med',       // Sombra media
      'hillshade_shadow_dark',      // Sombra oscura
      'hillshade_shadow_extreme',   // Sombra extrema
      'waterway-river-canal',       // Ríos y canales
      'waterway-small',             // Cuerpos de agua menores
      'water shadow',               // Sombra de cuerpos de agua
      'water',                      // Agua en general

      // 🏢 Edificaciones y estructuras
      'barrier_line-land-polygon',  // Barreras en polígonos de tierra
      'barrier_line-land-line',     // Barreras como líneas
      'aeroway-polygon',            // Áreas del aeropuerto
      'aeroway-runway',             // Pistas de aterrizaje
      'aeroway-taxiway',            // Calles de rodaje
      'building',                   // Edificios
      'building-line',              // Contornos de edificios

      // 🚧 Túneles y obras
      'tunnel-construction',            // Túnel en construcción
      'tunnel-motorway_trunk_link',     // Túnel en vías rápidas secundarias
      'tunnel-service-link-track',      // Túnel de servicios
      'tunnel-street_limited',          // Túnel de calle restringida
      'tunnel-street',                  // Túnel de calle
      'tunnel-secondary-tertiary',      // Túnel de vías secundarias/terciarias
      'tunnel-primary',                 // Túnel de vía primaria
      'tunnel-motorway-trunk',          // Túnel de autopistas principales

      // 🚗 Ferries
      'ferry_auto',                 // Ferry para automóviles

      // 📍 Puntos de interés (POI)
      'poi-scalerank3',             // POIs menos relevantes
      'poi-parks-scalerank3',       // Parques como POIs (bajo ranking)
      'poi-scalerank2',             // POIs medianamente relevantes
      'poi-parks-scalerank2',       // Parques como POIs (ranking medio)
      'poi-parks-scalerank1',       // Parques como POIs (ranking alto)
      'poi-scalerank1',             // POIs más importantes

      // 🛣️ Etiquetas de carreteras
      'road-label-street',              // Nombre de calle
      'road-label-secondary-tertiary', // Nombre de vías secundarias/terciarias
      'road-label-primary',            // Nombre de vía primaria
      'road-label-motorway-trunk',     // Nombre de autopista
      'road-shields-black',            // Señalización vial (fondo negro)
      'road-shields-white',            // Señalización vial (fondo blanco)

      // 🛤️ Ferrocarril
      'rail-label',                // Etiquetas de rieles

      // 🏙️ Zonas y ciudades
      'place-residential',                      // Zona residencial
      'place-islet-archipelago-aboriginal',    // Islas o zonas indígenas
      'place-hamlet',                          // Caserío
      'place-village',                         // Pueblo
      'place-town',                            // Ciudad pequeña
      'place-island',                          // Isla
      'place-city-sm',                         // Ciudad pequeña
      'place-city-md-s',                       // Ciudad mediana (sur)
      'place-city-md-n',                       // Ciudad mediana (norte)
      'place-city-lg-s',                       // Ciudad grande (sur)
      'place-city-lg-n',                       // Ciudad grande (norte)
      'airport-label',                         // Etiqueta del aeropuerto

      // 🌉 Puentes
      'bridge-street_limited-case',           // Variante de puente limitado
      'bridge-street-case',                   // Variante de calle con puente
      'bridge-secondary-tertiary-case',       // Puente de vía secundaria/terciaria
      'bridge-primary-case',                  // Puente de vía primaria
      'bridge-motorway_trunk_link-case',      // Puente en vía rápida secundaria
      'bridge-motorway-trunk-case',           // Puente en vía rápida principal
      'bridge-motorway_trunk_link',           // Vía rápida secundaria sobre puente
      'bridge-street_limited',                // Calle limitada sobre puente
      'bridge-street',                        // Calle sobre puente
      'bridge-secondary-tertiary',            // Vía secundaria/terciaria sobre puente
      'bridge-primary',                       // Vía primaria sobre puente
      'bridge-motorway-trunk',                // Autopista sobre puente

      // 🗺️ Límites administrativos
      'admin-3-4-boundaries-bg',          // Límite local (fondo)
      'admin-2-boundaries-bg',            // Límite regional (fondo)
      'admin-3-4-boundaries',             // Límite local
      'admin-2-boundaries',               // Límite regional
      'admin-2-boundaries-dispute',      // Límite en disputa

      // 🗺️ Etiquetas de agua
      'waterway-label',                  // Nombre de ríos y canales
    ];
    capasAEliminar.forEach(id => {
      if (map.getLayer(id)) {
        map.removeLayer(id);
      }
    });
  }
  // Agregar switches al menú
export function initLayerToggleMenu(map) {
  const container = document.getElementById('layer-toggle-options');

  capasAEliminar.forEach(layerId => {
    const wrapper = document.createElement('div');
    wrapper.style.marginBottom = '4px';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = layerId;
    checkbox.checked = false;
    checkbox.onchange = () => {
      if (checkbox.checked) {
        if (!map.getLayer(layerId)) return;
        map.setLayoutProperty(layerId, 'visibility', 'none');
      } else {
        if (!map.getLayer(layerId)) return;
        map.setLayoutProperty(layerId, 'visibility', 'visible');
      }
    };

    const label = document.createElement('label');
    label.htmlFor = layerId;
    label.innerText = layerId;

    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);
    container.appendChild(wrapper);

    // Oculta capa al iniciar
    if (map.getLayer(layerId)) {
      map.setLayoutProperty(layerId, 'visibility', 'none');
    }
  });
  const layers = map.getStyle().layers;
  layers.forEach(layer => {
    if (layer.id.startsWith('unwanted')) {
      map.removeLayer(layer.id);
    }
  });
}


