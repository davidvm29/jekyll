// Recuperar los resultados de la búsqueda almacenados en la caché del navegador


var cachedResults = localStorage.getItem('searchResults');

if (cachedResults) {
    // Convertir los resultados de cadena JSON a objeto JavaScript
    var results = JSON.parse(cachedResults);
    // Mostrar los resultados en el elemento HTML adecuado (en este caso, en el mismo elemento que en la página anterior)
    var resultsContainer = document.getElementById('results-container');
    
    if (results.length > 0) {
        // Mostrar los resultados
        results.forEach(function(result) {
            var listItem = document.createElement('li');
            listItem.textContent = result.title;
            // Enlazar el resultado a su URL correspondiente
            var link = document.createElement('a');
            link.href = result.url;
            link.appendChild(listItem);
            resultsContainer.appendChild(link);
        });
    } else {
        // Mostrar mensaje de "No hay resultados para esta búsqueda" o "No result found"
        var mensaje = idioma === "es" ? "No hay resultados para esta búsqueda" : "No result found";
        resultsContainer.textContent = mensaje;
    }
} else {
    // Si no hay resultados en el caché, mostrar un mensaje de error
    console.error("No se encontraron resultados en el caché.");
}
