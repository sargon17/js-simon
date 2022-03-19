const numbersRow = document.querySelector("#numbersRow");
const timerDom = document.querySelector("#timerDom");

let numbersToRemember = noRepeatNumbersGenerator(5);
const timer = setInterval(updateTimer, 1000);
let seconds = 30;

displayNumbers(numbersToRemember, numbersRow);

function randomNumberGenerator(min = 1, max = 100) {
  return Math.floor(Math.random() * (max - min) + min);
}

function noRepeatNumbersGenerator(quantity = 1) {
  let array = [];
  while (array.length < quantity) {
    let number = randomNumberGenerator(1, 99);
    if (!array.includes(number)) {
      array.push(number);
    }
  }
  return array;
}

function displayNumbers(numbersArray, place) {
  for (let index = 0; index < numbersArray.length; index++) {
    let element = document.createElement("p");
    element.innerText = `${numbersArray[index]}`;
    place.appendChild(element);
  }
}

function updateTimer() {
  if (seconds === 0) {
    clearInterval(timer);
  }
  timerDom.innerText = `00:${seconds > 10 ? seconds : "0" + seconds}`;
  seconds--;
}
