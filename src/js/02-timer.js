import Notiflix from 'notiflix';

import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const startBtnRef = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');
let deadlineValue;
let timerValue = {};
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
    }
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
}
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
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
