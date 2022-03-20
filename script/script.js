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

// Generates a random number betwen the given range
function randomNumberGenerator(min = 1, max = 100) {
  return Math.floor(Math.random() * (max - min) + min);
}

// chek for repeating numbers
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

// Create the elements to display the numbers
function displayNumbers(numbersArray, place) {
  place.innerHTML = "";
  for (let index = 0; index < numbersArray.length; index++) {
    let element = document.createElement("p");
    element.innerText = `${numbersArray[index]}`;
    place.appendChild(element);
  }
}

// update every second the game timer
function updateGameTimer() {
  if (seconds === 0) {
    clearInterval(timer);
    hideNumbers();
  }
  timerDom.innerText = `00:${seconds > 9 ? seconds : "0" + seconds}`;
  seconds--;
}

// pre game section, like a redy to go
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

// display the numbers to remember & start the countdown
function startGame() {
  seconds = timeToRemember - 1;
  // Generated NUmbers Array
  numbersToRemember = noRepeatNumbersGenerator(numbersQuantity);
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

// Function to create multiple elements on the DOM with an given ID
function createMultipleDomElements(parent, number, type, id) {
  parent.innerHTML = "";
  for (let index = 1; index <= number; index++) {
    let element = document.createElement(`${type}`);
    element.id = `${id}-${index}`;
    element.className = `${id}`;
    parent.appendChild(element);
  }
}

// Function that read all the values in inputs, and store them in an array
function readInputsValue(array) {
  for (let index = 0; index < array.length; index++) {
    numbersInputedByUser.push(parseInt(array[index].value));
  }
  compareUserAndRealNumbers(numbersInputedByUser, numbersToRemember);
}

// check how many numbers inputed by user correspond to the initial ones
function compareUserAndRealNumbers(userNumbers, generatedNumbers) {
  rightNumbers = 0;
  for (let index = 0; index < numbersQuantity; index++) {
    if (userNumbers[index] === generatedNumbers[index]) {
      rightNumbers++;
    }
  }
  displayResult(rightNumbers, numbersQuantity);
}
// Display the final result to the player
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

// Additional function that help to display messages.
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
    secondaryText.innerHTML = "None of the number is right";
  }
}

// Additional function that hide from the user dom elements
function hideFromDisplay(domElement) {
  domElement.classList.add("d-none");
  // The opacity is here tho help animations
  domElement.classList.add("opacity-0");
}
// Additional function that did pretty the same bat insted of hiding it shown dom's elements
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
