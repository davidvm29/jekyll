var searchConfig = {
  resultsContainer: document.getElementById('results-container'),
  json: idioma === "es" ? '/assets/json/search_es.json' : '/assets/json/search_en.json'
};

var sjs = new SimpleJekyllSearch(searchConfig);

function buscarYRedirigir() {
  var query = document.getElementById('q').value;
  var results = obtenerResultadosDeBusqueda(searchTerm);
  localStorage.setItem('searchResults', JSON.stringify(results));
  // Redireccionar a la página de búsqueda
  if(idioma==="es"){
    window.location.href = baseUrl + "/search.html";
  }else{
    window.location.href = baseUrl +"/search_en.html";
  }
  if (query) {
      sjs.search(query);
  }
}
