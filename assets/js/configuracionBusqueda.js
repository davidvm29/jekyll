var searchConfig = {
    searchInput: document.getElementById('q'),
    resultsContainer: document.getElementById('results-container')
  };

  if (idioma == "es") {
    searchConfig.json = baseUrl+ '/assets/json/search_es.json';
  } else {
    searchConfig.json = baseUrl+'/assets/json/search_en.json';
  }

new SimpleJekyllSearch(searchConfig);