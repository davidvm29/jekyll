var searchConfig = {
    searchInput: document.getElementById('q'),
    resultsContainer: document.getElementById('results-container')
  };

  if (idioma === "es") {
    searchConfig.json = '/assets/json/search_es.json';
  } else {
    searchConfig.json = '/assets/json/search_en.json';
  }

new SimpleJekyllSearch(searchConfig);