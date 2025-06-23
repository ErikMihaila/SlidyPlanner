function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const datesContainer = document.getElementById('dates');
const modal = document.getElementById('day-modal');
const modalContent = document.getElementById('modal-content');
const modalDay = document.getElementById('modal-day');

const noteTextarea = document.getElementById('note-text');
const saveButton = document.getElementById('save-note');
const savedNotesList = document.getElementById('saved-notes-list');

let selectedDateKey = ''; 
let noteWasSaved = false; 

function getCurrentDateKey() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function showNoteForSelectedDate() {
    savedNotesList.innerHTML = ''; 

    const notesJSON = localStorage.getItem(selectedDateKey);
    const notes = notesJSON ? JSON.parse(notesJSON) : [];

    const pendingNotes = notes.filter(note => !note.completed);

    pendingNotes.forEach((note, index) => {
        const li = document.createElement('li');
        li.textContent = note.text; 
        li.dataset.id = note.id;    
        li.dataset.index = index;   

        let touchStartX = 0;
        let touchEndX = 0;

        li.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });

        li.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) { 
                markNoteAsCompleted(li);
            }
        });

        let mouseStartX = 0;
        let isDragging = false;

        li.addEventListener('mousedown', e => {
            mouseStartX = e.clientX;
            isDragging = true;
        });

        li.addEventListener('mouseup', e => {
            if (isDragging) {
                const mouseEndX = e.clientX;
                if (mouseStartX - mouseEndX > 50) { 
                    markNoteAsCompleted(li); 
                }
                isDragging = false;
            }
        });

        savedNotesList.appendChild(li);
    });
}


function markNoteAsCompleted(liElement) {
    liElement.classList.add('tachado'); 


    const noteIdToComplete = liElement.dataset.id; 

    const notesJSON = localStorage.getItem(selectedDateKey);
    const notes = notesJSON ? JSON.parse(notesJSON) : [];


    const noteIndex = notes.findIndex(note => note.id === noteIdToComplete);
    if (noteIndex !== -1) {
        notes[noteIndex].completed = true; 
        localStorage.setItem(selectedDateKey, JSON.stringify(notes)); 

        const event = new CustomEvent('taskCompleted', { detail: { dateKey: selectedDateKey, taskId: noteIdToComplete } });
        document.dispatchEvent(event);
    }
    
    setTimeout(() => {
        liElement.remove(); 
    }, 800); 
}


if (datesContainer) {
    datesContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'DIV' && e.target.textContent.trim() !== '') {
            const dayText = e.target.textContent;
            const rect = e.target.getBoundingClientRect();
            const clickX = rect.left + rect.width / 2;
            const clickY = rect.top + rect.height / 2;

            modal.classList.remove('hidden');

            const monthYearText = document.getElementById('month-year').textContent;
            const [mesNombre, añoStr] = monthYearText.split(' ');
            const año = parseInt(añoStr);
            const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
            const mes = meses.indexOf(mesNombre);
            const dia = parseInt(dayText);

            const fecha = new Date(año, mes, dia);
            const opciones = { weekday: 'long', day: 'numeric', month: 'long' };
            let fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);
            fechaFormateada = fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);

            modalDay.textContent = fechaFormateada; 

            const mesStr = (mes + 1).toString().padStart(2, '0');
            const diaStr = dia.toString().padStart(2, '0');
            selectedDateKey = `${año}-${mesStr}-${diaStr}`;
            
            noteWasSaved = false; 
            noteTextarea.value = ''; 
            updateSaveButtonState(); 

            showNoteForSelectedDate(); 


            modalContent.style.top = `${clickY}px`;
            modalContent.style.left = `${clickX}px`;
            modalContent.style.transform = 'translate(-50%, -50%) scale(0.3)';
            modalContent.style.opacity = '0';
            void modalContent.offsetWidth;
            modalContent.style.top = '50%';
            modalContent.style.left = '50%';
            modalContent.style.transform = 'translate(-50%, -50%) scale(1)';
            modalContent.style.opacity = '1';
        }
    });
}


noteTextarea.addEventListener('input', () => {
    updateSaveButtonState();
});

function updateSaveButtonState() {
    const hasText = noteTextarea.value.trim().length > 0;
    if (hasText) {
        saveButton.classList.add('save-active');
        saveButton.classList.remove('save-disabled');
        saveButton.textContent = '✓';
        saveButton.style.display = 'flex';
    } else {
        saveButton.classList.remove('save-active');
        saveButton.classList.add('save-disabled');
        saveButton.textContent = '+';
        saveButton.style.display = 'none'; 
    }
}

saveButton.addEventListener('click', () => {
    const noteText = noteTextarea.value.trim();
    if (selectedDateKey && noteText !== '') {
        const notesJSON = localStorage.getItem(selectedDateKey);
        const notes = notesJSON ? JSON.parse(notesJSON) : [];
        const newNote = {
            id: generateUUID(), 
            text: noteText,
            completed: false 
        };

        notes.push(newNote); 
        localStorage.setItem(selectedDateKey, JSON.stringify(notes)); 
        noteWasSaved = true;

        saveButton.classList.add('pulse'); 

        const event = new CustomEvent('taskAdded', { detail: { dateKey: selectedDateKey, taskId: newNote.id } });
        document.dispatchEvent(event);

        setTimeout(() => {
            saveButton.classList.remove('pulse');
            saveButton.classList.remove('save-active');
            saveButton.classList.add('save-disabled');
            saveButton.textContent = '+';
            saveButton.style.display = 'none';
            noteTextarea.value = '';
            showNoteForSelectedDate(); 
        }, 500);
    }
});

if (modal) {
    modal.addEventListener('click', (e) => {
        if (!modalContent.contains(e.target)) {
            modalContent.style.transform = 'translate(-50%, -50%) scale(0.3)';
            modalContent.style.opacity = '0';

            setTimeout(() => {
                modal.classList.add('hidden');
            }, 500);

            if (!noteWasSaved) {
                noteTextarea.value = '';
            }

            selectedDateKey = ''; 
            updateSaveButtonState(); 
        }
    });
}

window.addEventListener('beforeunload', () => {
    noteTextarea.value = '';
    selectedDateKey = '';
    noteWasSaved = false;
});