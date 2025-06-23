let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('page-content');
  const dayModal = document.getElementById('day-modal');
  const loadingScreen = document.getElementById('loading-screen');

  if (sessionStorage.getItem('skipLoadingScreen') === 'true') {
    loadingScreen.style.display = 'none';

    content.style.opacity = '0';
    content.style.transform = 'translateY(100px)';
    
    setTimeout(() => {
      content.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      content.style.opacity = '1';
      content.style.transform = 'translateY(0)';
    }, 50);

    sessionStorage.removeItem('skipLoadingScreen');

  } else {

    content.style.opacity = '0';
    content.style.transform = 'translateY(100px)';

    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
        content.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
      }, 500);
    }, 3000); 
  }

  function prepareTransition() {
    sessionStorage.setItem('skipLoadingScreen', 'true');
  }

  document.addEventListener('touchstart', e => {
    touchStartY = e.changedTouches[0].screenY;
  });

  document.addEventListener('touchend', e => {
    if (dayModal && !dayModal.classList.contains('hidden')) return;

    touchEndY = e.changedTouches[0].screenY;
    handleGesture();
  });

  function handleGesture() {
    const difference = touchStartY - touchEndY;
    const duration = 500;

    if (difference > 80) {
      content.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
      content.style.opacity = '0';
      content.style.transform = 'translateY(-100px)';

      prepareTransition();

      setTimeout(() => {
        if (window.location.pathname.includes('index_2.html')) {
          window.location.href = 'index_3.html';
        } else {
          window.location.href = 'index_2.html';
        }
      }, duration);

    } else if (difference < -80) {
      content.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
      content.style.opacity = '0';
      content.style.transform = 'translateY(100px)';

      prepareTransition();

      setTimeout(() => {
        if (window.location.pathname.includes('index_2.html')) {
          window.location.href = 'index.html';
        } else if (window.location.pathname.includes('index_3.html')) {
          window.location.href = 'index_2.html';
        } else {
          window.location.href = 'index.html';
        }
      }, duration);
    }
  }
});
