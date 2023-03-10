// HTML містить кнопки «Start» і «Stop».

// <button type="button" data-start>Start</button>
// <button type="button" data-stop>Stop</button>

// Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір фону <body> на
// випадкове значення, використовуючи інлайн стиль. Натисканням на кнопку «Stop» зміна кольору фону повинна
//  зупинятися.

// УВАГА
// Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів. Зроби так, щоб доки зміна
//  теми запущена, кнопка «Start» була неактивною (disabled).

// Для генерування випадкового кольору використовуй функцію getRandomHexColor.

const startBtnRef = document.querySelector('[data-start]');

const stopBtnRef = document.querySelector('[data-stop]');

let IntervalId = null;

stopBtnRef.setAttribute('disabled', '');
startBtnRef.addEventListener('click', onBgcolorChange);

function onBgcolorChange() {
  startBtnRef.setAttribute('disabled', '');
  stopBtnRef.removeAttribute('disabled');
  document.body.style.backgroundColor = getRandomHexColor();
  IntervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

stopBtnRef.addEventListener('click', onBgcolorChangeStop);

function onBgcolorChangeStop() {
  clearInterval(IntervalId);
  startBtnRef.removeAttribute('disabled');
  stopBtnRef.setAttribute('disabled', '');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
