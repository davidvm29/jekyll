// Recuperar los resultados de la búsqueda almacenados en la caché del navegador
var cachedResults = localStorage.getItem('searchResults');
if (cachedResults) {
    // Convertir los resultados de cadena JSON a objeto JavaScript
    var results = JSON.parse(cachedResults);
    // Mostrar los resultados en el elemento HTML adecuado (en este caso, en el mismo elemento que en la página anterior)
    var resultsContainer = document.getElementById('results-container');
    results.forEach(function(result) {
        var listItem = document.createElement('li');
        listItem.textContent = result.title;
        // Enlazar el resultado a su URL correspondiente
        var link = document.createElement('a');
        link.href = result.url;
        link.appendChild(listItem);
        resultsContainer.appendChild(link);
    });
}