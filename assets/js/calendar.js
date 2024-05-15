document.addEventListener('DOMContentLoaded', function () {
    var currentYear = new Date().getFullYear();
    var currentMonth = new Date().getMonth() + 1; // JavaScript cuenta los meses desde 0
  
    // Función para marcar el día actual
    function markCurrentDay() {
    const today = new Date(); // Obtener la fecha actual
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1; // Meses en JavaScript son de 0 a 11
    const currentYear = today.getFullYear();

    const calendarDates = document.querySelectorAll('#calendarBody .calendarDate:not(.calendarDayName)');

    // Iterar sobre cada día del calendario y marcar el día actual si se encuentra
    calendarDates.forEach(dayElement => {
      const day = parseInt(dayElement.textContent);
      const month = parseInt(dayElement.getAttribute('data-month'));
      const year = parseInt(dayElement.getAttribute('data-year'));
  
      if (day === currentDay && month === currentMonth && year === currentYear) {
        dayElement.classList.add('current-day');
      }
    });
  }
  
  
    // Actualiza el contenido del calendario
    function updateCalendar(year, month) {
      document.getElementById('currentMonth').textContent = monthName(month) + ' ' + year;
      document.getElementById('calendarBody').innerHTML = createCalendar(year, month);
      updateNewsLinks(year, month);
      markCurrentDay(); // Marcar el día actual
    }
  
    // Función para crear el calendario
    function createCalendar(year, month) {
      let mon = month - 1; // Los meses en JS son 0..11, no 1..12
      let d = new Date(year, mon);
  
      let table = '';
  
      // Espacios en la primera línea
      // Desde lunes hasta el primer día del mes
      // * * * 1  2  3  4
      table += '<tr>';
      for (let i = 0; i < getDay(d); i++) {
        table += '<td></td>';
      }
  
      // <td> con el día  (1 - 31)
      while (d.getMonth() == mon) {
        let fechaNoticia = monthName(d.getMonth() + 1) + ' ' + d.getDate() + ', ' + d.getFullYear();
        let newsLink = fechanoticia.includes(fechaNoticia) ? '<a href="#">' + d.getDate() + '</a>' : d.getDate();
        let dataDay = ('0' + d.getDate()).slice(-2);
        let dataMonth = ('0' + (d.getMonth() + 1)).slice(-2);
        let dataYear = d.getFullYear();
        table += '<td class="calendarDate" data-day="' + dataDay + '" data-month="' + dataMonth + '" data-year="' + dataYear + '" data-news-date="' + fechaNoticia + '">' + newsLink + '</td>';
  
        if (getDay(d) % 7 == 6) { // Domingo, último día de la semana --> nueva línea
          table += '</tr><tr>';
        }
  
        d.setDate(d.getDate() + 1);
      }
  
      // Espacios después del último día del mes hasta completar la última línea
      // 29 30 31 * * * *
      if (getDay(d) != 0) {
        for (let i = getDay(d); i < 7; i++) {
          table += '<td></td>';
        }
      }
  
      // Cerrar la tabla
      table += '</tr>';
  
      return table;
    }
  
    // Función para obtener el número de día desde 0 (lunes) a 6 (domingo)
    function getDay(date) {
      let day = date.getDay();
      if (day == 0) day = 7; // Hacer domingo (0) el último día
      return day - 1;
    }
  
    // Función para obtener el nombre del mes
    function monthName(month) {
      const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      return months[month - 1];
    }
  
  
    // Función para ir al mes anterior
    function previousMonth() {
      if (currentMonth === 1) {
        currentMonth = 12;
        currentYear--;
      } else {
        currentMonth--;
      }
      updateCalendar(currentYear, currentMonth);
    }
  
    // Función para ir al siguiente mes
    function nextMonth() {
      if (currentMonth === 12) {
        currentMonth = 1;
        currentYear++;
      } else {
        currentMonth++;
      }
      updateCalendar(currentYear, currentMonth);
    }
  
    // Función para actualizar los enlaces de las noticias
    function updateNewsLinks(year, month) {
    const newsLinks = document.querySelectorAll('.calendarDate');
    const fechasContenidos = fechanoticia.split(' ');
    const arrayfechas = {};
  
    // Procesar fechas y enlaces y almacenarlos en un objeto
    for (let i = 0; i < fechasContenidos.length; i += 5) {
      const fecha = fechasContenidos[i];
      const enlace = fechasContenidos[i + 1];
      const titulo = fechasContenidos[i + 2];
      const fecha_publicacion = fechasContenidos[i + 3];
      const lugar_publicacion = fechasContenidos[i + 4];
  
      if (!arrayfechas[fecha]) {
        arrayfechas[fecha] = [];
      }
      arrayfechas[fecha].push({ enlace, titulo, fecha_publicacion, lugar_publicacion }); // Incluir el título junto con el enlace y la fecha de publicación
    }
  
    // Almacenar datos en la caché del navegador
    localStorage.setItem('fechasEnlaces', JSON.stringify(arrayfechas));
  
    // Iterar sobre los enlaces de noticias
    for (let i = 0; i < newsLinks.length; i++) {
      const fechaNoticia = newsLinks[i].getAttribute('data-news-date');
      const fechaCalendario = ('0' + newsLinks[i].getAttribute('data-day')).slice(-2) + '/' + ('0' + (month)).slice(-2) + '/' + year;
  
      const enlacesAsociados = arrayfechas[fechaCalendario];
      const titulo = newsLinks[i].textContent;
  
      if (enlacesAsociados) {
        if (idioma === "es") {
        newsLinks[i].innerHTML = '<a href="/noticiasfiltradas.html">' + titulo + '</a>';
        }else{
          newsLinks[i].innerHTML = '<a href="/noticiasfiltradas_en.html">' + titulo + '</a>';
        }
        // Agregar evento de clic para almacenar la fecha, el título y los enlaces asociados y mostrar ventana emergente
        newsLinks[i].addEventListener('click', function () {
    const fechaClicada = fechaCalendario;
    const fechasPublicacion = enlacesAsociados.map(noticia => noticia.fecha_publicacion);
    const lugaresPublicacion = enlacesAsociados.map(noticia => noticia.lugar_publicacion);
    localStorage.setItem('fechaClicada', fechaClicada);
    localStorage.setItem('enlacesAsociados', JSON.stringify(enlacesAsociados));
    localStorage.setItem('titulo', titulo); // Almacenar el título
    localStorage.setItem('fechasPublicacion', JSON.stringify(fechasPublicacion));
    localStorage.setItem('lugaresPublicacion', JSON.stringify(lugaresPublicacion));
  
  });
      }
    }
  }
  
    // Inicializa el calendario
    updateCalendar(currentYear, currentMonth);
  
    // Evitar la navegación predeterminada al hacer clic en los enlaces de flechas
    document.getElementById('prevMonthLink').addEventListener('click', function (event) {
      event.preventDefault();
      previousMonth();
    });
  
    document.getElementById('nextMonthLink').addEventListener('click', function (event) {
      event.preventDefault();
      nextMonth();
    });
  });
