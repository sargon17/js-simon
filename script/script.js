const numbersRow = document.querySelector("#numbersRow");
const inputsRow = document.querySelector("#inputsRow");
const messagesRow = document.querySelector("#messagesRow");
const timerDom = document.querySelector("#timerDom");
const cardBtnSubmit = document.querySelector("#cardBtnSubmit");
const playBtn = document.querySelector("#playBtn");

let numbersToRemember = [];
let numbersInputedByUser = [];
let timer;
// TODO set seconds to 30 seconds after testing
let seconds = 1;
let numbersQuantity = 5;
let rightNumbers = 0;

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

function updateGameTimer() {
  if (seconds === 0) {
    clearInterval(timer);
    hideNumbers();
  }
  timerDom.innerText = `00:${seconds > 10 ? seconds : "0" + seconds}`;
  seconds--;
}
function preGame() {
  let toGameSeconds = 3;
  let gameStart = setInterval(() => {
    if (toGameSeconds === 0) {
      clearInterval(gameStart);
      startGame();
    }
    document.querySelector(
      "#messagesRow > h3"
    ).innerHTML = `Game start in ${toGameSeconds}`;
    toGameSeconds--;
  }, 1000);
}

function startGame() {
  // Generated NUmbers Array
  numbersToRemember = noRepeatNumbersGenerator(numbersQuantity);
  // TODO Cancel after testing
  console.log(numbersToRemember);
  // Display numbers
  hideFromDisplay(messagesRow);
  displayNumbers(numbersToRemember, numbersRow);
  showToDisplay(numbersRow);

  // Timer settings
  timer = setInterval(updateGameTimer, 1000);
}

function hideNumbers() {
  // Hide numbers for those who wanna cheat and watch the inspector
  let elements = document.querySelectorAll("#numbersRow > p");
  for (let index = 0; index < elements.length; index++) {
    elements[index].innerHTML = "**";
  }

  //   Change the window to inputs
  hideFromDisplay(numbersRow);
  createMultipleDomElements(
    inputsRow,
    numbersQuantity,
    "input",
    "numberInputs"
  );
  showToDisplay(inputsRow);
  cardBtnSubmit.classList.remove("opacity-0");
}

function createMultipleDomElements(parent, number, type, id) {
  for (let index = 1; index <= number; index++) {
    let element = document.createElement(`${type}`);
    element.id = `${id}-${index}`;
    element.className = `${id}`;
    parent.appendChild(element);
  }
}
function readInputsValue(array) {
  for (let index = 0; index < array.length; index++) {
    numbersInputedByUser.push(parseInt(array[index].value));
  }
  console.log(numbersInputedByUser);
  compareUserAndRealNumbers(numbersInputedByUser, numbersToRemember);
}
function compareUserAndRealNumbers(userNumbers, generatedNumbers) {
  rightNumbers = 0;
  for (let index = 0; index < numbersQuantity; index++) {
    if (userNumbers[index] === generatedNumbers[index]) {
      rightNumbers++;
    }
  }
  console.log(rightNumbers);
}
function displayResult(rightNumbers, totalNumbers) {
  let coefficient = rightNumbers / totalNumbers;
  console.log(coefficient);
}

function hideFromDisplay(domElement) {
  domElement.classList.add("d-none");
}
function showToDisplay(domElement) {
  domElement.classList.remove("d-none");
}

playBtn.addEventListener("click", () => {
  preGame();
});
cardBtnSubmit.addEventListener("click", () => {
  const inputs = document.querySelectorAll(".numberInputs");
  readInputsValue(inputs);
});
