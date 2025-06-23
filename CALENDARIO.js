let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

const datesElem = document.getElementById('dates');
const monthYearElem = document.getElementById('month-year');

function updateCalendarContent() {
  datesElem.innerHTML = '';

  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  monthYearElem.textContent = `${months[currentMonth]} ${currentYear}`;


  let firstDay = new Date(currentYear, currentMonth, 1).getDay();
  firstDay = (firstDay === 0) ? 6 : firstDay - 1;

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.classList.add('empty');
    datesElem.appendChild(emptyCell);
  }

  const today = new Date();
  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement('div');
    dayCell.textContent = day;

    if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
      dayCell.classList.add('today');
    }

    datesElem.appendChild(dayCell);
  }
}

function changeMonthWithAnimation(delta) {
  if (datesElem.classList.contains('slide-out-left') || datesElem.classList.contains('slide-out-right')) {
    return;
  }

  const direction = delta > 0 ? 'left' : 'right';

  datesElem.classList.add(`slide-out-${direction}`);

  datesElem.addEventListener('animationend', function handler() {
    datesElem.removeEventListener('animationend', handler);

    currentMonth += delta;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    } else if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }

    datesElem.classList.remove(`slide-out-${direction}`);
    updateCalendarContent();

    const opposite = direction === 'left' ? 'right' : 'left';
    datesElem.classList.add(`slide-in-${opposite}`);

    datesElem.addEventListener('animationend', function handler2() {
      datesElem.removeEventListener('animationend', handler2);
      datesElem.classList.remove(`slide-in-${opposite}`);
    });
  });
}

updateCalendarContent();

let touchStartX = 0;
let touchEndX = 0;

const calendar = document.querySelector('.calendar');

calendar.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});

calendar.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  const diff = touchEndX - touchStartX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      changeMonthWithAnimation(-1);
    } else {
      changeMonthWithAnimation(1);
    }
  }
});


