let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('page-content');
  const dayModal = document.getElementById('day-modal');

  content.style.opacity = '0';
  content.style.transform = 'translateY(100px)';

  setTimeout(() => {
    content.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    content.style.opacity = '1';
    content.style.transform = 'translateY(0)';
  }, 50);

  document.addEventListener('touchstart', function (e) {
    touchStartY = e.changedTouches[0].screenY;
  });

  document.addEventListener('touchend', function (e) {
    if (dayModal && !dayModal.classList.contains('hidden')) return;

    touchEndY = e.changedTouches[0].screenY;
    handleGesture();
  });

  function handleGesture() {
    const difference = touchStartY - touchEndY;
    const duration = 500;
    const currentPage = window.location.pathname;

    console.log('Página actual:', currentPage); 

    if (difference > 80) {

      content.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
      content.style.opacity = '0';
      content.style.transform = 'translateY(-100px)';
      setTimeout(() => {
        if (currentPage.endsWith('index.html') || currentPage === '/') {
          window.location.href = 'index_2.html';
        } else if (currentPage.endsWith('index_2.html')) {
          window.location.href = 'index_3.html';
        } else if (currentPage.endsWith('index_3.html')) {
          window.location.href = 'index_4.html';
        } else if (currentPage.endsWith('index_4.html')) {
          window.location.href = 'index_5.html'; 
        } else if (currentPage.endsWith('index_5.html')) {
          window.location.href = 'index.html'; 
        }
      }, duration);
    } else if (difference < -80) {

      content.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
      content.style.opacity = '0';
      content.style.transform = 'translateY(100px)';
      setTimeout(() => {
        if (currentPage.endsWith('index.html') || currentPage === '/') {
          window.location.href = 'index_5.html'; 
        } else if (currentPage.endsWith('index_2.html')) {
          window.location.href = 'index.html';
        } else if (currentPage.endsWith('index_3.html')) {
          window.location.href = 'index_2.html';
        } else if (currentPage.endsWith('index_4.html')) {
          window.location.href = 'index_3.html';
        } else if (currentPage.endsWith('index_5.html')) {
          window.location.href = 'index_4.html';
        }
      }, duration);
    }
  }
});