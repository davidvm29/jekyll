// Definir la configuración para SimpleJekyllSearch
var searchConfig = {
  resultsContainer: document.getElementById('results-container'),
  json: idioma === "es" ? '/assets/json/search_es.json' : '/assets/json/search_en.json'
};

// Inicializar SimpleJekyllSearch con la configuración definida
var sjs = new SimpleJekyllSearch(searchConfig);

// Función para obtener resultados de búsqueda
function obtenerResultadosDeBusqueda(searchTerm) {
  var results = [];
  sjs.search(searchTerm, function(result) {
      results.push(result);
  });
  return results;
}
