const confettiButton = document.getElementById('confettiButton');
const confettiContainer = document.getElementById('confettiContainer');
let confettiInterval;
let confettiDurationTimer;
const confettiDuration = 60 * 1000; 

const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confettiContainer.appendChild(confetti);

    const randomSize = Math.random() * (15 - 5) + 5; 

    const startX = Math.random() * (window.innerWidth - randomSize);
    const startY = -randomSize; 

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomDelay = Math.random() * 2; 
    const randomDuration = Math.random() * (5 - 2) + 2; 

    confetti.style.left = `${startX}px`;
    confetti.style.top = `${startY}px`;
    confetti.style.backgroundColor = randomColor;
    confetti.style.width = `${randomSize}px`;
    confetti.style.height = `${randomSize}px`;
    confetti.style.animationDelay = `${randomDelay}s`;
    confetti.style.animationDuration = `${randomDuration}s`;
    confetti.style.animationName = 'fall'; 
    confetti.addEventListener('animationend', () => {
        confetti.remove();
    });
}

function startConfetti() {
    stopConfetti();

    confettiInterval = setInterval(createConfetti, 50); 
    confettiButton.disabled = true; 
    confettiDurationTimer = setTimeout(() => {
        stopConfetti();
        confettiButton.disabled = false; 
    }, confettiDuration);
}

function stopConfetti() {
    clearInterval(confettiInterval);
    clearTimeout(confettiDurationTimer);
    while (confettiContainer.firstChild) {
        confettiContainer.removeChild(confettiContainer.firstChild);
    }
}

confettiButton.addEventListener('click', startConfetti);