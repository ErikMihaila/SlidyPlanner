document.addEventListener("DOMContentLoaded", function () {
    const tabla = document.getElementById("tabla-horario");
    const tablaContainer = document.getElementById("tabla-horario-container");

    if (typeof window.diaOffset === 'undefined') {
        window.diaOffset = 0;
    }

    function obtenerNotasDelDia(fecha) {
        const year = fecha.getFullYear();
        const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const day = fecha.getDate().toString().padStart(2, '0');
        const fechaClave = `${year}-${month}-${day}`;

        const notasJSON = localStorage.getItem(fechaClave);
        const allNotes = notasJSON ? JSON.parse(notasJSON) : [];
        const actividades = {};

        const pendingNotes = allNotes.filter(notaObjeto => {
            return (
                typeof notaObjeto === 'object' && 
                notaObjeto !== null &&            
                typeof notaObjeto.text === 'string' && 
                !notaObjeto.completed           
            );
        });

        pendingNotes.forEach(notaObjeto => {
            const notaTexto = notaObjeto.text;
            const match = notaTexto.match(/\b([01]?\d|2[0-3]):[0-5]\d\b/);
            if (match) {
                const horaCompleta = match[0];
                const horaParte = horaCompleta.split(':')[0].padStart(2, '0');
                const claveHora = `${horaParte}:00`;

                if (actividades[claveHora]) {
                    actividades[claveHora] += `; ${notaTexto}`;
                } else {
                    actividades[claveHora] = notaTexto;
                }
            }
        });

        return actividades;
    }

    function renderHorario() {
        const hoy = new Date();
        const fecha = new Date(hoy);
        fecha.setDate(hoy.getDate() + window.diaOffset);

        const asignaturas = obtenerNotasDelDia(fecha);
        const esHoy = window.diaOffset === 0;
        const horaActual = new Date().getHours();

        tabla.innerHTML = "";

        for (let hora = 6; hora <= 21; hora++) {
            const horaTexto = hora.toString().padStart(2, '0') + ":00";
            const fila = document.createElement("tr");

            const celdaHora = document.createElement("td");
            celdaHora.textContent = horaTexto;

            const celdaAsignatura = document.createElement("td");
            celdaAsignatura.textContent = asignaturas[horaTexto] || "";

            if (esHoy && hora <= horaActual) {
                celdaHora.classList.add("hora-actual");
                celdaAsignatura.classList.add("hora-actual");
            }

            fila.appendChild(celdaHora);
            fila.appendChild(celdaAsignatura);
            tabla.appendChild(fila);
        }
    }

    function mostrarHorarioConAnimacion(direccion) {
        if (tablaContainer.classList.contains("slide-out-left") || tablaContainer.classList.contains("slide-out-right")) return;

        const outClass = direccion === "izquierda" ? "slide-out-left" : "slide-out-right";
        const inClass = direccion === "izquierda" ? "slide-in-right" : "slide-in-left";

        tablaContainer.classList.add(outClass);

        tablaContainer.addEventListener("animationend", function handler1() {
            tablaContainer.removeEventListener("animationend", handler1);
            tablaContainer.classList.remove(outClass);

            renderHorario();

            tablaContainer.classList.add(inClass);
            tablaContainer.addEventListener("animationend", function handler2() {
                tablaContainer.removeEventListener("animationend", handler2);
                tablaContainer.classList.remove(inClass);
            });
        });
    }

    renderHorario();

    let touchStartX = 0;

    document.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
    });

    document.addEventListener("touchend", (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const deltaX = touchEndX - touchStartX;

        if (Math.abs(deltaX) > 50) {
            if (deltaX < 0) {
                window.diaOffset++;
                mostrarHorarioConAnimacion("izquierda");
            } else {
                window.diaOffset--;
                mostrarHorarioConAnimacion("derecha");
            }
        }
    });

    let ultimoOffset = window.diaOffset;
    setInterval(() => {
        if (window.diaOffset !== ultimoOffset) {
            const direccion = window.diaOffset > ultimoOffset ? "izquierda" : "derecha";
            ultimoOffset = window.diaOffset;
            mostrarHorarioConAnimacion(direccion);
        }
    }, 100);
    
    document.addEventListener('taskAdded', (e) => {
        const currentDisplayedDate = new Date();
        currentDisplayedDate.setDate(currentDisplayedDate.getDate() + window.diaOffset);
        const currentDisplayedDateKey = `${currentDisplayedDate.getFullYear()}-${(currentDisplayedDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDisplayedDate.getDate().toString().padStart(2, '0')}`;

        if (e.detail.dateKey === currentDisplayedDateKey) {
            renderHorario();
        }
    });

    document.addEventListener('taskCompleted', (e) => {
        const currentDisplayedDate = new Date();
        currentDisplayedDate.setDate(currentDisplayedDate.getDate() + window.diaOffset);
        const currentDisplayedDateKey = `${currentDisplayedDate.getFullYear()}-${(currentDisplayedDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDisplayedDate.getDate().toString().padStart(2, '0')}`;

        if (e.detail.dateKey === currentDisplayedDateKey) {
            renderHorario();
        }
    });
});