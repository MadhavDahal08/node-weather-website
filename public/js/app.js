console.log('Hello form the client site javscript');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  messageOne.textContent = 'Loading.......';
  messageTwo.textContent = '';
  const location = search.value;
  const url = `http://localhost:3000/weather?address=${location}`;
  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        return messageOne.textContent = data.error;
      }
      messageOne.textContent = data.location;
      messageTwo.textContent =`${data.summary} It is currently ${data.temperature} degree out. there is ${data.precipProbability}%  chance of rain`;
    });
  });
});
