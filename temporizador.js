document.addEventListener('DOMContentLoaded', () => {
    const editableHours = document.getElementById('editableHours');
    const editableMinutes = document.getElementById('editableMinutes');
    const editableSeconds = document.getElementById('editableSeconds');
    const editableMode = document.getElementById('editableMode');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playPauseIcon = document.getElementById('playPauseIcon');
    const resetBtn = document.getElementById('resetBtn');
    const presetBtns = document.querySelectorAll('.preset-btn');
    const timerProgress = document.querySelector('.timer-progress');

    let totalSeconds = 0;
    let secondsLeft = 0;
    let intervalId = null;
    let isPaused = true;
    let isEditingTime = false;

    const MODE_TEXT_STORAGE_KEY = 'timerModeText';
    const DEFAULT_MODE_TEXT = 'ESTUDIO';
    const MAX_MODE_TEXT_LENGTH = 20; 

    const radius = timerProgress.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    timerProgress.style.strokeDasharray = `${circumference} ${circumference}`;
    timerProgress.style.strokeDashoffset = circumference;

    function setProgress(percent) {
        const offset = circumference - (percent / 100) * circumference;
        timerProgress.style.strokeDashoffset = offset;
    }

    function formatTime(totalSecs) {
        const hours = Math.floor(totalSecs / 3600);
        const minutes = Math.floor((totalSecs % 3600) / 60);
        const seconds = totalSecs % 60;

        return {
            hours: String(hours).padStart(2, '0'),
            minutes: String(minutes).padStart(2, '0'),
            seconds: String(seconds).padStart(2, '0')
        };
    }

    function updateDisplay() {
        if (!isEditingTime) {
            const formatted = formatTime(secondsLeft);
            editableHours.textContent = formatted.hours;
            editableMinutes.textContent = formatted.minutes;
            editableSeconds.textContent = formatted.seconds;
        }
        const percent = (totalSeconds > 0) ? (secondsLeft / totalSeconds) * 100 : 0;
        setProgress(percent);
    }

    function updateTimeFromInputs() {
        const h = parseInt(editableHours.textContent) || 0;
        const m = parseInt(editableMinutes.textContent) || 0;
        const s = parseInt(editableSeconds.textContent) || 0;

        if (isNaN(h) || h < 0 || h > 99 || 
            isNaN(m) || m < 0 || m > 59 || 
            isNaN(s) || s < 0 || s > 59) {
            
            alert('Entrada de tiempo inválida. Por favor, introduce números entre 00-99 para horas y 00-59 para minutos/segundos.');
            const previousTime = formatTime(totalSeconds);
            editableHours.textContent = previousTime.hours;
            editableMinutes.textContent = previousTime.minutes;
            editableSeconds.textContent = previousTime.seconds;
            return false;
        }

        const newTotalSeconds = h * 3600 + m * 60 + s;
        if (newTotalSeconds === 0) { 
            totalSeconds = 0;
            secondsLeft = 0;
        } else {
            totalSeconds = newTotalSeconds;
            secondsLeft = newTotalSeconds;
        }
        updateDisplay();
        return true;
    }

    function vibrateDevice(pattern) {
        if ("vibrate" in navigator) {
            navigator.vibrate(pattern);
        } else {
            console.log("La API de Vibración no está soportada en este dispositivo/navegador.");
        }
    }

    function startTimer() {
        if (intervalId) clearInterval(intervalId);

        if (totalSeconds === 0) {
            alert('Por favor, selecciona un tiempo preestablecido o edita el tiempo manualmente.');
            pauseTimer();
            return;
        }

        isPaused = false;
        playPauseIcon.src = 'STOP.png';

        intervalId = setInterval(() => {
            if (secondsLeft > 0) {
                secondsLeft--;
                updateDisplay();
            } else {
                clearInterval(intervalId);
                intervalId = null;
                isPaused = true;
                playPauseIcon.src = 'PLAY.png';
                
                vibrateDevice([200, 100, 200, 100, 200]);
                
                alert('¡Tiempo terminado!');
            }
        }, 1000);
    }

    function pauseTimer() {
        clearInterval(intervalId);
        intervalId = null;
        isPaused = true;
        playPauseIcon.src = 'PLAY.png';
    }

    function resetTimer() {
        pauseTimer();
        secondsLeft = totalSeconds;
        updateDisplay();
        playPauseIcon.src = 'PLAY.png';
    }

    function saveModeText() {
        localStorage.setItem(MODE_TEXT_STORAGE_KEY, editableMode.textContent.trim());
    }

    function loadModeText() {
        const savedText = localStorage.getItem(MODE_TEXT_STORAGE_KEY);
        if (savedText) {
            editableMode.textContent = savedText;
        } else {
            editableMode.textContent = DEFAULT_MODE_TEXT;
        }
    }

    editableMode.addEventListener('click', () => {
        editableMode.setAttribute('contenteditable', 'true');
        editableMode.focus();
    });

    editableMode.addEventListener('blur', () => {
        if (editableMode.textContent.length > MAX_MODE_TEXT_LENGTH) {
            editableMode.textContent = editableMode.textContent.substring(0, MAX_MODE_TEXT_LENGTH);
        }
        editableMode.setAttribute('contenteditable', 'false');
        saveModeText();
    });

    editableMode.addEventListener('input', () => {
        if (editableMode.textContent.length > MAX_MODE_TEXT_LENGTH) {
            const selection = window.getSelection();
            const range = document.createRange();
            
            editableMode.textContent = editableMode.textContent.substring(0, MAX_MODE_TEXT_LENGTH);
            
            if (editableMode.firstChild) {
                range.setStart(editableMode.firstChild, MAX_MODE_TEXT_LENGTH);
                range.collapse(true);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
    });

    editableMode.addEventListener('keydown', (e) => {
        if (editableMode.textContent.length >= MAX_MODE_TEXT_LENGTH && 
            e.key.length === 1 && 
            !e.ctrlKey && !e.altKey && !e.metaKey && 
            e.key !== 'Backspace' && e.key !== 'Delete' && 
            e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'Tab') {
            
            e.preventDefault();
        }

        if (e.key === 'Enter') {
            e.preventDefault();
            editableMode.blur();
        }
    });

    function handleTimeSegmentEdit(segmentElement) {
        pauseTimer();
        isEditingTime = true;
        
        const range = document.createRange();
        range.selectNodeContents(segmentElement);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }

    function handleTimeSegmentBlur() {
        isEditingTime = false;
        updateTimeFromInputs(); 
    }

    function handleTimeSegmentKeydown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
        if (!/^\d$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'Tab') {
            e.preventDefault();
        }
    }

    editableHours.addEventListener('click', () => handleTimeSegmentEdit(editableHours));
    editableMinutes.addEventListener('click', () => handleTimeSegmentEdit(editableMinutes));
    editableSeconds.addEventListener('click', () => handleTimeSegmentEdit(editableSeconds));

    editableHours.addEventListener('blur', handleTimeSegmentBlur);
    editableMinutes.addEventListener('blur', handleTimeSegmentBlur);
    editableSeconds.addEventListener('blur', handleTimeSegmentBlur);

    editableHours.addEventListener('keydown', handleTimeSegmentKeydown);
    editableMinutes.addEventListener('keydown', handleTimeSegmentKeydown);
    editableSeconds.addEventListener('keydown', handleTimeSegmentKeydown);

    playPauseBtn.addEventListener('click', () => {
        if (totalSeconds === 0) {
            alert('Por favor, selecciona un tiempo preestablecido o edita el tiempo manualmente.');
            return;
        }
        if (isPaused) {
            startTimer();
        } else {
            pauseTimer();
        }
    });

    resetBtn.addEventListener('click', resetTimer);

    presetBtns.forEach(button => {
        button.addEventListener('click', () => {
            pauseTimer();
            totalSeconds = parseInt(button.dataset.time);
            secondsLeft = totalSeconds;
            updateDisplay();
        });
    });

    loadModeText();
    totalSeconds = 0;
    secondsLeft = totalSeconds;
    updateDisplay();
});