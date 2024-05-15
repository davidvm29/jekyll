document.addEventListener('DOMContentLoaded', function() {
    const fechaClicada = localStorage.getItem('fechaClicada');
    const enlacesAsociadosStr = localStorage.getItem('enlacesAsociados');
    const titulo = localStorage.getItem('titulo');
    const fechasPublicacionStr = localStorage.getItem('fechasPublicacion');
    const lugaresPublicacionStr = localStorage.getItem('lugaresPublicacion');
    const infoContainer = document.getElementById('info-container');

    if (fechaClicada && enlacesAsociadosStr && titulo) {
        const enlacesAsociados = JSON.parse(enlacesAsociadosStr);
        const fechasPublicacion = JSON.parse(fechasPublicacionStr);
        const lugaresPublicacion = JSON.parse(lugaresPublicacionStr);
        let htmlContent = '';

        if (idioma === "es") {
            htmlContent += '<div class="elementosfiltrados"> Actualidad Universitaria - Elementos filtrados por fecha: ' + fechaClicada + ' </div>';
        } else {
            htmlContent += '<div class="elementosfiltrados"> University News - Items filtered by date: ' + fechaClicada + ' </div>';
        }

        enlacesAsociados.forEach(function(enlace, index) {
            const tituloFormateado = enlace.titulo.replace(/_/g, ' ');
            const lugarFormateado = lugaresPublicacion[index].replace(/_/g, ' ');
            const fechaFormateada = fechasPublicacion[index].replace(/_/g, ' '); // Se realiza el reemplazo para las fechas de publicación
            htmlContent += '<div class="itemContainer">'; // Añadido un contenedor para el artículo
            htmlContent += '<span>' + fechaFormateada + '</span>'; // Se utiliza la fecha formateada
            htmlContent += '<h2 class="titulofiltradas"><a href="' + enlace.enlace + '">' + tituloFormateado + '</a></h2>';
            htmlContent += '<div class="genericItemCategory">';
            if (idioma === "es") {
                htmlContent += '<span>Publicado en</span>';
            } else {
                htmlContent += '<span>Published in</span>';
            }
            htmlContent += '<a id="lugar" href="#">  ' + lugarFormateado + ' ' + '</a>';
            if (idioma === "es") {
                htmlContent += '<a href="' + enlace.enlace + '">&nbsp;Leer más...</a>';
            } else {
                htmlContent += '<a href="' + enlace.enlace + '">&nbsp;Read more...</a>';
            }
            htmlContent += '</div>';
            htmlContent += '</div>';
        });

        infoContainer.innerHTML = htmlContent;
    } else {
        infoContainer.innerHTML = '<p>Error.</p>';
    }
});