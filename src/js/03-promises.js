import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');
const formData = {};
const promicesData = [];

formRef.addEventListener('input', getFeedbackFormState);

function getFeedbackFormState(e) {
  formData[e.target.name] = e.target.value;
}

function createDataArrayForPromises(data) {
  let promisDelay = Number(data.delay);
  for (let i = 0; i < data.amount; i += 1) {
    promicesData.push({ position: i + 1, delay: promisDelay });
    promisDelay += Number(data.step);
  }
}
formRef.addEventListener('submit', onPromisesStart);

function onPromisesStart(evt) {
  evt.preventDefault();
  createDataArrayForPromises(formData);

  promicesData.map(({ position, delay }) => {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay} ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay} ms`);
      });
  });
  promicesData.length = 0;
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
