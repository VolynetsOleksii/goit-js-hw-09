// Елементи інтерфейсу
// HTML містить готову розмітку таймера, поля вибору кінцевої дати і кнопку, по кліку на яку, таймер повинен
//  запускатися. Додай мінімальне оформлення елементів інтерфейсу.

// <input type="text" id="datetime-picker" />
// <button type="button" data-start>Start</button>

// <div class="timer">
//   <div class="field">
//     <span class="value" data-days>00</span>
//     <span class="label">Days</span>
//   </div>
//   <div class="field">
//     <span class="value" data-hours>00</span>
//     <span class="label">Hours</span>
//   </div>
//   <div class="field">
//     <span class="value" data-minutes>00</span>
//     <span class="label">Minutes</span>
//   </div>
//   <div class="field">
//     <span class="value" data-seconds>00</span>
//     <span class="label">Seconds</span>
//   </div>
// </div>

// Бібліотека flatpickr
// Використовуй бібліотеку flatpickr для того, щоб дозволити користувачеві кросбраузерно вибрати кінцеву
// дату і час в одному елементі інтерфейсу. Для того щоб підключити CSS код бібліотеки в проект, необхідно
//  додати ще один імпорт, крім того, що описаний в документації.

// // Описаний в документації
// import flatpickr from "flatpickr";
// // Додатковий імпорт стилів
// import "flatpickr/dist/flatpickr.min.css";

// Бібліотека очікує, що її ініціалізують на елементі input[type="text"], тому ми додали до HTML документу
//  поле input#datetime-picker.

// <input type="text" id="datetime-picker" />

// Другим аргументом функції flatpickr(selector, options) можна передати необов'язковий об'єкт параметрів.
//  Ми підготували для тебе об'єкт, який потрібен для виконання завдання. Розберися, за що відповідає кожна
//   властивість в документації «Options», і використовуй його у своєму коді.

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     console.log(selectedDates[0]);
//   },
// };

// Вибір дати
// Метод onClose() з об'єкта параметрів викликається щоразу під час закриття елемента інтерфейсу, який
//  створює flatpickr. Саме у ньому варто обробляти дату, обрану користувачем. Параметр selectedDates - це
//  масив обраних дат, тому ми беремо перший елемент.

// Якщо користувач вибрав дату в минулому, покажи window.alert() з текстом "Please choose a date in the
// future".
// Якщо користувач вибрав валідну дату (в майбутньому), кнопка «Start» стає активною.
// Кнопка «Start» повинна бути неактивною доти, доки користувач не вибрав дату в майбутньому.
// Натисканням на кнопку «Start» починається відлік часу до обраної дати з моменту натискання.
// Відлік часу
// Натисканням на кнопку «Start» скрипт повинен обчислювати раз на секунду, скільки часу залишилось до
// вказаної дати, і оновлювати інтерфейс таймера, показуючи чотири цифри: дні, години, хвилини і секунди у
//  форматі xx:xx:xx:xx.

// Кількість днів може складатися з більше, ніж двох цифр.
// Таймер повинен зупинятися, коли дійшов до кінцевої дати, тобто 00:00:00:00.
// НЕ БУДЕМО УСКЛАДНЮВАТИ
// Якщо таймер запущений, для того щоб вибрати нову дату і перезапустити його - необхідно перезавантажити
// сторінку.

// Для підрахунку значень використовуй готову функцію convertMs, де ms - різниця між кінцевою і поточною
//  датою в мілісекундах.



// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

// Форматування часу
// Функція convertMs() повертає об'єкт з розрахованим часом, що залишився до кінцевої дати. Зверни увагу,
//  що вона не форматує результат. Тобто, якщо залишилося 4 хвилини або будь-якої іншої складової часу, то
//   функція поверне 4, а не 04. В інтерфейсі таймера необхідно додавати 0, якщо в числі менше двох 
//   символів. Напиши функцію addLeadingZero(value), яка використовує метод padStart() і перед рендерингом 
//   інтефрейсу форматує значення.

// Бібліотека повідомлень
// УВАГА
// Наступний функціонал не обов'язковий для здавання завдання, але буде хорошою додатковою практикою.

// Для відображення повідомлень користувачеві, замість window.alert(), використовуй бібліотеку notiflix.
import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const startBtnRef = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');
let deadlineValue;
let timerValue ={};
const inputFlatpickrRef = document.querySelector('#datetime-picker');

startBtnRef.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (options.defaultDate > selectedDates[0]) {
        Notiflix.Notify.failure('Please choose a date in the future');
    //   alert('Please choose a date in the future');
    }
    // console.log(selectedDates[0]);
    startBtnRef.removeAttribute('disabled');
    deadlineValue = selectedDates[0];
  },
};
flatpickr(inputFlatpickrRef, options);

startBtnRef.addEventListener('click', onTimerStart);

function onTimerStart() {
    startBtnRef.setAttribute('disabled', '');
   
    const timeInterval = setInterval(() => {
    const diff = deadlineValue - new Date();
    console.log(diff);
    if (diff < 1000) {    
        clearInterval(timeInterval);
    } 
    timerValue = convertMs(diff);
    daysRef.textContent = timerValue.days;
    hoursRef.textContent = timerValue.hours;
    minutesRef.textContent = timerValue.minutes;
    secondsRef.textContent = timerValue.seconds;
 }, 1000);
 
}



function addLeadingZero(value) {
    return String(value).padStart(2, 0);
};
function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
    
  }

 






