function mostrarFecha() {
  const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio",
                 "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

  const hoy = new Date();
  const fecha = new Date(hoy); 
  fecha.setDate(fecha.getDate() + (window.diaOffset || 0)); 
  const nombreDia = dias[fecha.getDay()];
  const diaMes = fecha.getDate();
  const nombreMes = meses[fecha.getMonth()];
  const capitalizar = texto => texto.charAt(0).toUpperCase() + texto.slice(1);
  const fechaFormateada = `${capitalizar(nombreDia)}, ${diaMes} de ${capitalizar(nombreMes)}`;
  const contenedor = document.getElementById("fecha-cuadro");
  if (contenedor) {
    contenedor.textContent = fechaFormateada;
  } else {
    console.error("No se encontró el elemento con id 'fecha-cuadro'");
  }
}
document.addEventListener("DOMContentLoaded", function () {
  window.diaOffset = 0; 
  mostrarFecha();

  let ultimoOffset = window.diaOffset;
  setInterval(() => {
    if (window.diaOffset !== ultimoOffset) {
      ultimoOffset = window.diaOffset;
      mostrarFecha();
    }
  }, 100);
});
