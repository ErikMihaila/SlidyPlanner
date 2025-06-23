

document.addEventListener('DOMContentLoaded', () => {
    const dateElement = document.getElementById('current-date');
    const completionChartCanvas = document.getElementById('completionChart');
    const ctx = completionChartCanvas.getContext('2d');
    const completionPercentageDisplay = document.getElementById('completionPercentage');
    const completionMessageContainer = document.getElementById('completionMessage'); 
    const messageDiv = completionMessageContainer.parentElement; 


    const confettiButton = document.getElementById('confettiButton');


    function getCurrentDateKey() {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }


    function displayCurrentDateHeader() {
        const now = new Date();
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        const formattedDate = now.toLocaleDateString('es-ES', options);
        dateElement.textContent = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }


    function updateCompletionStatus() {
        const todayKey = getCurrentDateKey();
        const notesJSON = localStorage.getItem(todayKey);
        const allNotes = notesJSON ? JSON.parse(notesJSON) : [];

       
        const totalTasks = allNotes.length;
        const completedTasks = allNotes.filter(note => note.completed).length;

        let completionPercentage = 0;
        if (totalTasks > 0) {
            completionPercentage = (completedTasks / totalTasks) * 100;
        }

        drawChart(completionPercentage);
        completionPercentageDisplay.textContent = `${completionPercentage.toFixed(2)}%`;

       
        messageDiv.innerHTML = '';
        let messageText = "";

       
        if (completionPercentage === 100) {
            messageText = `¡Felicidades, has completado todas tus tareas para hoy!🥳​`;
            messageDiv.textContent = messageText; 
            confettiButton.style.display = 'block'; 
        } else {
           
            confettiButton.style.display = 'none';

            if (completionPercentage >= 75) {
                messageText = `¡Has completado el ${completionPercentage.toFixed(2)}%, un esfuerzo más y casi lo tienes!​😍`;
            } else if (completionPercentage >= 50) {
                messageText = `¡Wow, has completado el ${completionPercentage.toFixed(2)}% de tus tareas para hoy, sigue así y recibirás una sorpresa!​😲​`;
            } else if (completionPercentage >= 25) {
                messageText = `Has completado el ${completionPercentage.toFixed(2)}%, casi la mitad de tus tareas de hoy.​😀`;
            } else { 
                messageText = `Has completado el ${completionPercentage.toFixed(2)}% de tus tareas, no te rindas, sigue adelante.​😊`;
            }
            messageDiv.textContent = messageText; 
        }

    }


    function drawChart(percentage) {
        const centerX = completionChartCanvas.width / 2;
        const centerY = completionChartCanvas.height / 2;
        const radius = Math.min(centerX, centerY) - 10; 

        ctx.clearRect(0, 0, completionChartCanvas.width, completionChartCanvas.height);

       
        const completedAngle = (percentage / 100) * 2 * Math.PI;

        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, 0, completedAngle);
        ctx.closePath();
        ctx.fillStyle = '#666666'; 
        ctx.fill();


        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, completedAngle, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = '#333333'; 
        ctx.fill();

  
        ctx.strokeStyle = '#000000'; 
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.stroke();
    }


    document.addEventListener('taskAdded', (event) => {
        console.log("Evento 'taskAdded' recibido para:", event.detail.dateKey);
        updateCompletionStatus();
    });


    document.addEventListener('taskCompleted', (event) => {
        console.log("Evento 'taskCompleted' recibido para:", event.detail.dateKey);
        updateCompletionStatus();
    });


    displayCurrentDateHeader(); 
    updateCompletionStatus();    
});