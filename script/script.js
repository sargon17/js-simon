const numbersRow = document.querySelector("#numbersRow");

let numbersToRemember = noRepeatNumbersGenerator(5);

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
