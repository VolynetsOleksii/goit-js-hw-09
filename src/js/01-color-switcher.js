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
