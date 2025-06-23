document.addEventListener('DOMContentLoaded', () => {

    const rectangulo1 = document.querySelector('.rectangulo1');
    const ventana1 = document.getElementById('ventana1');
    const overlay1 = document.getElementById('overlay1');

    const rectangulo2 = document.querySelector('.rectangulo2');
    const ventana2 = document.getElementById('ventana2');
    const overlay2 = document.getElementById('overlay2');

    const rectangulo3 = document.querySelector('.rectangulo3');
    const ventana3 = document.getElementById('ventana3');
    const overlay3 = document.getElementById('overlay3');

    const rectangulo4 = document.querySelector('.rectangulo4');
    const ventana4 = document.getElementById('ventana4');
    const overlay4 = document.getElementById('overlay4');

    const rectangulo5 = document.querySelector('.rectangulo5');
    const ventana5 = document.getElementById('ventana5');
    const overlay5 = document.getElementById('overlay5');

    const rectangulo6 = document.querySelector('.rectangulo6');
    const ventana6 = document.getElementById('ventana6');
    const overlay6 = document.getElementById('overlay6');


    function abrirVentana1() {
        const rect1 = rectangulo1.getBoundingClientRect();
        overlay1.classList.remove('oculto');
        ventana1.classList.remove('oculto');
        ventana1.style.display = 'flex'; 
        ventana1.style.top = rect1.top + 'px';
        ventana1.style.left = rect1.left + 'px';
        ventana1.style.width = rect1.width + 'px';
        ventana1.style.height = rect1.height + 'px';
        ventana1.style.borderRadius = '10px';
        ventana1.offsetHeight;
        const finalWidth = 300;
        const finalHeight = 400;
        const finalTop = (window.innerHeight - finalHeight) / 2;
        const finalLeft = (window.innerWidth - finalWidth) / 2;
        ventana1.style.top = finalTop + 'px';
        ventana1.style.left = finalLeft + 'px';
        ventana1.style.width = finalWidth + 'px';
        ventana1.style.height = finalHeight + 'px';
        ventana1.style.borderRadius = '20px';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            ventana1.classList.add('mostrar-contenido');
        }, 200);
    }

    function cerrarVentana1() {
        const rect1 = rectangulo1.getBoundingClientRect();
        ventana1.classList.remove('mostrar-contenido');
        setTimeout(() => {
            ventana1.style.top = rect1.top + 'px';
            ventana1.style.left = rect1.left + 'px';
            ventana1.style.width = rect1.width + 'px';
            ventana1.style.height = rect1.height + 'px';
            ventana1.style.borderRadius = '10px';
            ventana1.addEventListener('transitionend', function handler() {
                ventana1.style.display = 'none';
                overlay1.classList.add('oculto');
                document.body.style.overflow = '';
                ventana1.removeEventListener('transitionend', handler); 
            });
        }, 300);
    }

    if (rectangulo1 && ventana1 && overlay1) {
        rectangulo1.addEventListener('click', (e) => { e.stopPropagation(); abrirVentana1(); });
        overlay1.addEventListener('click', cerrarVentana1);
        ventana1.addEventListener('click', (e) => { e.stopPropagation(); });
    } else {
        console.warn('Faltan elementos para rectangulo1 (rectangulo1, ventana1, overlay1)');
    }


    function abrirVentana2() {
        const rect2 = rectangulo2.getBoundingClientRect();
        overlay2.classList.remove('oculto');
        ventana2.classList.remove('oculto');
        ventana2.style.display = 'flex';
        ventana2.style.top = rect2.top + 'px';
        ventana2.style.left = rect2.left + 'px';
        ventana2.style.width = rect2.width + 'px';
        ventana2.style.height = rect2.height + 'px';
        ventana2.style.borderRadius = '10px';
        ventana2.offsetHeight;
        const finalWidth = 300;
        const finalHeight = 400;
        const finalTop = (window.innerHeight - finalHeight) / 2;
        const finalLeft = (window.innerWidth - finalWidth) / 2;
        ventana2.style.top = finalTop + 'px';
        ventana2.style.left = finalLeft + 'px';
        ventana2.style.width = finalWidth + 'px';
        ventana2.style.height = finalHeight + 'px';
        ventana2.style.borderRadius = '20px';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            ventana2.classList.add('mostrar-contenido');
        }, 200);
    }

    function cerrarVentana2() {
        const rect2 = rectangulo2.getBoundingClientRect();
        ventana2.classList.remove('mostrar-contenido');
        setTimeout(() => {
            ventana2.style.top = rect2.top + 'px';
            ventana2.style.left = rect2.left + 'px';
            ventana2.style.width = rect2.width + 'px';
            ventana2.style.height = rect2.height + 'px';
            ventana2.style.borderRadius = '10px';
            ventana2.addEventListener('transitionend', function handler() {
                ventana2.style.display = 'none';
                overlay2.classList.add('oculto');
                document.body.style.overflow = '';
                ventana2.removeEventListener('transitionend', handler);
            });
        }, 300);
    }

    if (rectangulo2 && ventana2 && overlay2) {
        rectangulo2.addEventListener('click', (e) => { e.stopPropagation(); abrirVentana2(); });
        overlay2.addEventListener('click', cerrarVentana2);
        ventana2.addEventListener('click', (e) => { e.stopPropagation(); });
    } else {
        console.warn('Faltan elementos para rectangulo2 (rectangulo2, ventana2, overlay2)');
    }



    function abrirVentana3() {
        const rect3 = rectangulo3.getBoundingClientRect();
        overlay3.classList.remove('oculto');
        ventana3.classList.remove('oculto');
        ventana3.style.display = 'flex';
        ventana3.style.top = rect3.top + 'px';
        ventana3.style.left = rect3.left + 'px';
        ventana3.style.width = rect3.width + 'px';
        ventana3.style.height = rect3.height + 'px';
        ventana3.style.borderRadius = '10px';
        ventana3.offsetHeight;
        const finalWidth = 300;
        const finalHeight = 400;
        const finalTop = (window.innerHeight - finalHeight) / 2;
        const finalLeft = (window.innerWidth - finalWidth) / 2;
        ventana3.style.top = finalTop + 'px';
        ventana3.style.left = finalLeft + 'px';
        ventana3.style.width = finalWidth + 'px';
        ventana3.style.height = finalHeight + 'px';
        ventana3.style.borderRadius = '20px';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            ventana3.classList.add('mostrar-contenido');
        }, 200);
    }

    function cerrarVentana3() {
        const rect3 = rectangulo3.getBoundingClientRect();
        ventana3.classList.remove('mostrar-contenido');
        setTimeout(() => {
            ventana3.style.top = rect3.top + 'px';
            ventana3.style.left = rect3.left + 'px';
            ventana3.style.width = rect3.width + 'px';
            ventana3.style.height = rect3.height + 'px';
            ventana3.style.borderRadius = '10px';
            ventana3.addEventListener('transitionend', function handler() {
                ventana3.style.display = 'none';
                overlay3.classList.add('oculto');
                document.body.style.overflow = '';
                ventana3.removeEventListener('transitionend', handler);
            });
        }, 300);
    }

    if (rectangulo3 && ventana3 && overlay3) {
        rectangulo3.addEventListener('click', (e) => { e.stopPropagation(); abrirVentana3(); });
        overlay3.addEventListener('click', cerrarVentana3);
        ventana3.addEventListener('click', (e) => { e.stopPropagation(); });
    } else {
        console.warn('Faltan elementos para rectangulo3 (rectangulo3, ventana3, overlay3)');
    }

   
    function abrirVentana4() {
        const rect4 = rectangulo4.getBoundingClientRect();
        overlay4.classList.remove('oculto');
        ventana4.classList.remove('oculto');
        ventana4.style.display = 'flex';
        ventana4.style.top = rect4.top + 'px';
        ventana4.style.left = rect4.left + 'px';
        ventana4.style.width = rect4.width + 'px';
        ventana4.style.height = rect4.height + 'px';
        ventana4.style.borderRadius = '10px';
        ventana4.offsetHeight;
        const finalWidth = 300;
        const finalHeight = 400;
        const finalTop = (window.innerHeight - finalHeight) / 2;
        const finalLeft = (window.innerWidth - finalWidth) / 2;
        ventana4.style.top = finalTop + 'px';
        ventana4.style.left = finalLeft + 'px';
        ventana4.style.width = finalWidth + 'px';
        ventana4.style.height = finalHeight + 'px';
        ventana4.style.borderRadius = '20px';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            ventana4.classList.add('mostrar-contenido');
        }, 200);
    }

    function cerrarVentana4() {
        const rect4 = rectangulo4.getBoundingClientRect();
        ventana4.classList.remove('mostrar-contenido');
        setTimeout(() => {
            ventana4.style.top = rect4.top + 'px';
            ventana4.style.left = rect4.left + 'px';
            ventana4.style.width = rect4.width + 'px';
            ventana4.style.height = rect4.height + 'px';
            ventana4.style.borderRadius = '10px';
            ventana4.addEventListener('transitionend', function handler() {
                ventana4.style.display = 'none';
                overlay4.classList.add('oculto');
                document.body.style.overflow = '';
                ventana4.removeEventListener('transitionend', handler);
            });
        }, 300);
    }

    if (rectangulo4 && ventana4 && overlay4) {
        rectangulo4.addEventListener('click', (e) => { e.stopPropagation(); abrirVentana4(); });
        overlay4.addEventListener('click', cerrarVentana4);
        ventana4.addEventListener('click', (e) => { e.stopPropagation(); });
    } else {
        console.warn('Faltan elementos para rectangulo4 (rectangulo4, ventana4, overlay4)');
    }

    
    function abrirVentana5() {
        const rect5 = rectangulo5.getBoundingClientRect();
        overlay5.classList.remove('oculto');
        ventana5.classList.remove('oculto');
        ventana5.style.display = 'flex';
        ventana5.style.top = rect5.top + 'px';
        ventana5.style.left = rect5.left + 'px';
        ventana5.style.width = rect5.width + 'px';
        ventana5.style.height = rect5.height + 'px';
        ventana5.style.borderRadius = '10px';
        ventana5.offsetHeight;
        const finalWidth = 300;
        const finalHeight = 400;
        const finalTop = (window.innerHeight - finalHeight) / 2;
        const finalLeft = (window.innerWidth - finalWidth) / 2;
        ventana5.style.top = finalTop + 'px';
        ventana5.style.left = finalLeft + 'px';
        ventana5.style.width = finalWidth + 'px';
        ventana5.style.height = finalHeight + 'px';
        ventana5.style.borderRadius = '20px';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            ventana5.classList.add('mostrar-contenido');
        }, 200);
    }

    function cerrarVentana5() {
        const rect5 = rectangulo5.getBoundingClientRect();
        ventana5.classList.remove('mostrar-contenido');
        setTimeout(() => {
            ventana5.style.top = rect5.top + 'px';
            ventana5.style.left = rect5.left + 'px';
            ventana5.style.width = rect5.width + 'px';
            ventana5.style.height = rect5.height + 'px';
            ventana5.style.borderRadius = '10px';
            ventana5.addEventListener('transitionend', function handler() {
                ventana5.style.display = 'none';
                overlay5.classList.add('oculto');
                document.body.style.overflow = '';
                ventana5.removeEventListener('transitionend', handler);
            });
        }, 300);
    }

    if (rectangulo5 && ventana5 && overlay5) {
        rectangulo5.addEventListener('click', (e) => { e.stopPropagation(); abrirVentana5(); });
        overlay5.addEventListener('click', cerrarVentana5);
        ventana5.addEventListener('click', (e) => { e.stopPropagation(); });
    } else {
        console.warn('Faltan elementos para rectangulo5 (rectangulo5, ventana5, overlay5)');
    }

    
    function abrirVentana6() {
        const rect6 = rectangulo6.getBoundingClientRect();
        overlay6.classList.remove('oculto');
        ventana6.classList.remove('oculto');
        ventana6.style.display = 'flex';
        ventana6.style.top = rect6.top + 'px';
        ventana6.style.left = rect6.left + 'px';
        ventana6.style.width = rect6.width + 'px';
        ventana6.style.height = rect6.height + 'px';
        ventana6.style.borderRadius = '10px';
        ventana6.offsetHeight;
        const finalWidth = 300;
        const finalHeight = 400;
        const finalTop = (window.innerHeight - finalHeight) / 2;
        const finalLeft = (window.innerWidth - finalWidth) / 2;
        ventana6.style.top = finalTop + 'px';
        ventana6.style.left = finalLeft + 'px';
        ventana6.style.width = finalWidth + 'px';
        ventana6.style.height = finalHeight + 'px';
        ventana6.style.borderRadius = '20px';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            ventana6.classList.add('mostrar-contenido');
        }, 200);
    }

    function cerrarVentana6() {
        const rect6 = rectangulo6.getBoundingClientRect();
        ventana6.classList.remove('mostrar-contenido');
        setTimeout(() => {
            ventana6.style.top = rect6.top + 'px';
            ventana6.style.left = rect6.left + 'px';
            ventana6.style.width = rect6.width + 'px';
            ventana6.style.height = rect6.height + 'px';
            ventana6.style.borderRadius = '10px';
            ventana6.addEventListener('transitionend', function handler() {
                ventana6.style.display = 'none';
                overlay6.classList.add('oculto');
                document.body.style.overflow = '';
                ventana6.removeEventListener('transitionend', handler);
            });
        }, 300);
    }

    if (rectangulo6 && ventana6 && overlay6) {
        rectangulo6.addEventListener('click', (e) => { e.stopPropagation(); abrirVentana6(); });
        overlay6.addEventListener('click', cerrarVentana6);
        ventana6.addEventListener('click', (e) => { e.stopPropagation(); });
    } else {
        console.warn('Faltan elementos para rectangulo6 (rectangulo6, ventana6, overlay6)');
    }

}); 