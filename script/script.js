const numbersRow = document.querySelector("#numbersRow");
const inputsRow = document.querySelector("#inputsRow");
const resultRow = document.querySelector("#resultRow");
const timerDom = document.querySelector("#timerDom");
const cardBtnSubmit = document.querySelector("#cardBtnSubmit");
const playBtn = document.querySelector("#playBtn");

let numbersToRemember = noRepeatNumbersGenerator(5);
let timer;
let seconds = 5;

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
// function preGame(){
//     let toGameSeconds = 3;
//     let gameStart = setInterval(()=>{
// document.querySelector('#resultRow > h3').innerHTML = `Game start in ${toGameSeconds}`;
// toGameSeconds--
//     })
// }

function startGame() {
  timer = setInterval(updateGameTimer, 1000);
  displayNumbers(numbersToRemember, numbersRow);
}

function hideNumbers() {
  // Hide numbers for those who wanna cheat and watch the inspector
  let elements = document.querySelectorAll("#numbersRow > p");
  for (let index = 0; index < elements.length; index++) {
    elements[index].innerHTML = "**";
  }

  //   Change the window to inputs
  numbersRow.classList.add("d-none");
  inputsRow.classList.remove("d-none");
  cardBtnSubmit.classList.remove("opacity-0");
}

playBtn.addEventListener("click", () => {
  preGame();
});
