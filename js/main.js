"use strict";

// elementos del html
const selectElement = document.querySelector(".js-select");
const button = document.querySelector(".js-button");
const resultMessage = document.querySelector(".js-resultMessage");
const playerCount = document.querySelector(".js-playerCount");
const computerCount = document.querySelector(".js-computerCount");

let userSelection = "";
let computerSelection = "";

// función para recoger valor del select
function getSelectValue() {
  const userSelection = selectElement.value;
  return userSelection;
}

// función para consolear la elección de la usuaria
function getWordForValueUser() {
  userSelection = getSelectValue();
  if (userSelection === "rock") {
    return console.log("La usuaria ha jugado PIEDRA");
  } else if (userSelection === "paper") {
    return console.log("La usuaria ha jugado PAPEL");
  } else if (userSelection === "scissors") {
    return console.log("La usuaria ha jugado TIJERA");
  } else {
    alert("Debes elegir una opción para empezar a jugar");
  }
  return userSelection;
}

// función generar num aleatorio
function getRandomNumber(max) {
  const randomNumber = Math.ceil(Math.random() * max);
  return randomNumber;
}

// función para comparar valor y palabra
function getWordForValueComputer(value) {
  if (value === "rock") {
    return console.log("El ordenador ha jugado PIEDRA");
  } else if (value === "paper") {
    return console.log("El ordenador ha jugado PAPEL");
  } else {
    return console.log("El ordenador ha jugado TIJERA");
  }
}

// función jugada ordenador según número aleatorio
function getComputerSelection(value) {
  const randomNumber = getRandomNumber(9);
  console.log(randomNumber);
  if (value !== "") {
    if (randomNumber <= 3) {
      computerSelection = "rock";
    } else if (randomNumber <= 6) {
      computerSelection = "paper";
    } else {
      computerSelection = "scissors";
    }
    getWordForValueComputer(computerSelection);
  }
  return computerSelection;
}

// función para comparar values
function compareSelections(value1, value2) {
  if (value1 === value2) {
    resultMessage.innerHTML = "Empate";
  } else if (
    value1 === "rock" &&
    (value2 === "paper" || value2 === "scissors")
  ) {
    resultMessage.innerHTML = "¡Has ganado!";
  } else if (value1 === "scissors" && value2 === "paper") {
    resultMessage.innerHTML = "¡Has ganado!";
  } else if (value1 === "paper" && value2 === "rock") {
    resultMessage.innerHTML = "¡Has ganado!";
  } else {
    resultMessage.innerHTML = "¡Has perdido!";
  }
}

// función manejadora del click
function handleButtonClick(event) {
  event.preventDefault();
  getWordForValueUser();
  getComputerSelection(userSelection);
  compareSelections(userSelection, computerSelection);
}

// listener
button.addEventListener("click", handleButtonClick);
