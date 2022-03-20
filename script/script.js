const numbersRow = document.querySelector("#numbersRow");
const inputsRow = document.querySelector("#inputsRow");
const messagesRow = document.querySelector("#messagesRow");
const timerDom = document.querySelector("#timerDom");
const cardBtnSubmit = document.querySelector("#cardBtnSubmit");
const cardBtnRestart = document.querySelector("#cardBtnRestart");
const playBtn = document.querySelector("#playBtn");

let numbersToRemember = [];
let numbersInputedByUser = [];
let timer;
let timeToRemember = 30;
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
  place.innerHTML = "";
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
  timerDom.innerText = `00:${seconds > 9 ? seconds : "0" + seconds}`;
  seconds--;
}
function preGame() {
  hideFromDisplay(numbersRow);
  hideFromDisplay(inputsRow);

  let mainMessage = document.querySelector("#messagesRow > h3");
  let secondaryMessage = document.querySelector("#messagesRow > p");
  mainMessage.innerHTML = "Game start in 3";
  secondaryMessage.innerHTML = "";
  let toGameSeconds = 2;
  let gameStart = setInterval(() => {
    if (toGameSeconds === 0) {
      clearInterval(gameStart);
      startGame();
    }
    mainMessage.innerHTML = `Game start in ${toGameSeconds}`;
    toGameSeconds--;
  }, 1000);
}

function startGame() {
  // TODO set seconds to 30 seconds after testing
  seconds = timeToRemember - 1;
  // Generated NUmbers Array
  numbersToRemember = noRepeatNumbersGenerator(numbersQuantity);
  // TODO Cancel after testing
  console.log(numbersToRemember);
  // Display numbers
  hideFromDisplay(messagesRow);
  displayNumbers(numbersToRemember, numbersRow);
  showToDisplay(numbersRow);
  // Prevent timer bug
  clearInterval(timer);

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
  showToDisplay(cardBtnSubmit);
}

function createMultipleDomElements(parent, number, type, id) {
  parent.innerHTML = "";
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
  displayResult(rightNumbers, numbersQuantity);
}
function displayResult(rightNumbers, totalNumbers) {
  let coefficient = rightNumbers / totalNumbers;
  switch (coefficient) {
    case 0:
      finalMessage("Damn, try again", rightNumbers, totalNumbers);
      break;
    case 1:
      finalMessage("Wow, great memory", rightNumbers, totalNumbers);
      break;
    default:
      finalMessage("Not bad, but try again", rightNumbers, totalNumbers);
      break;
  }
  showToDisplay(messagesRow);
}
function finalMessage(mainMessage, rightNumbers, totalNumbers) {
  let mainText = document.querySelector("#messagesRow > h3");
  let secondaryText = document.querySelector("#messagesRow > p");

  // Main message
  mainText.innerHTML = mainMessage;
  if (rightNumbers !== 0) {
    // display how many numbers are right
    secondaryText.innerHTML = `${rightNumbers} of ${totalNumbers} numbers ${
      rightNumbers > 1 ? "are" : "is"
    } right`;
  } else {
    // Display if there isn' right numbers
    secondaryText.innerHTML = "No one number is right";
  }
}

function hideFromDisplay(domElement) {
  domElement.classList.add("d-none");
  domElement.classList.add("opacity-0");
}
function showToDisplay(domElement) {
  domElement.classList.remove("d-none");
  domElement.classList.remove("opacity-0");
}

playBtn.addEventListener("click", () => {
  preGame();
});
cardBtnRestart.addEventListener("click", () => {
  preGame();
  hideFromDisplay(cardBtnRestart);
});
cardBtnSubmit.addEventListener("click", () => {
  let inputs = document.querySelectorAll(".numberInputs");
  readInputsValue(inputs);

  hideFromDisplay(inputsRow);
  hideFromDisplay(cardBtnSubmit);
  showToDisplay(cardBtnRestart);
});
