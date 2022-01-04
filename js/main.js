"use strict";

// elementos del html
const selectElement = document.querySelector(".js-select");
const button = document.querySelector(".js-button");
const resetButton = document.querySelector(".js-resetButton");
const resultMessage = document.querySelector(".js-resultMessage");
const playerCountElement = document.querySelector(".js-playerCount");
const computerCountElement = document.querySelector(".js-computerCount");
const computerValueElem = document.querySelector(".js-computerValue");
const userValueElem = document.querySelector(".js-userValue");

// variables globales contadores
let playerCount = parseInt(playerCountElement.innerHTML);
let computerCount = parseInt(computerCountElement.innerHTML);

// función habilitar botón
function enableButton(value) {
  if (value !== "") {
    button.removeAttribute("disabled");
    resetButton.removeAttribute("disabled");
  }
}

// función para recoger valor del select
function getSelectValue() {
  const userSelection = selectElement.value;
  return userSelection;
}

// función para mostrar la elección de la usuaria
function getWordForValueUser() {
  const userSelection = getSelectValue();
  if (userSelection === "rock") {
    userValueElem.innerHTML = "Tú has jugado PIEDRA";
  } else if (userSelection === "paper") {
    userValueElem.innerHTML = "Tú has jugado PAPEL";
  } else if (userSelection === "scissors") {
    userValueElem.innerHTML = "Tú has jugado TIJERA";
  }
  return userSelection;
}

// función generar num aleatorio
function getRandomNumber(max) {
  const randomNumber = Math.ceil(Math.random() * max);
  return randomNumber;
}

// función para mostrar la elección del ordenador
function getWordForValueComputer(value) {
  if (value === "rock") {
    computerValueElem.innerHTML = "La computadora ha jugado PIEDRA";
  } else if (value === "paper") {
    computerValueElem.innerHTML = "La computadora ha jugado PAPEL";
  } else {
    computerValueElem.innerHTML = "La computadora ha jugado TIJERA";
  }
}

// función jugada ordenador según número aleatorio
function getComputerSelection(value) {
  const randomNumber = getRandomNumber(9);
  let computerSelection = "";
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

// función para imprimir y asignar ganadora
function renderWinner(message, winnerValue) {
  resultMessage.innerHTML = message;
  let winner = winnerValue;
  return winner;
}

// función para comparar values
function compareSelections(value1, value2) {
  let winner = "";
  if (value1 === value2) {
    winner = renderWinner("Empate", "");
  } else if (value1 === "rock" && value2 === "scissors") {
    winner = renderWinner("¡Has ganado!", "user");
  } else if (value1 === "scissors" && value2 === "paper") {
    winner = renderWinner("¡Has ganado!", "user");
  } else if (value1 === "paper" && value2 === "rock") {
    winner = renderWinner("¡Has ganado!", "user");
  } else {
    winner = renderWinner("¡Has perdido!", "computer");
  }
  return winner;
}

// función para actualizar contadores
function updateCount(winner) {
  if (winner !== "") {
    if (winner === "user") {
      playerCount++;
      playerCountElement.innerHTML = playerCount;
    } else {
      computerCount++;
      computerCountElement.innerHTML = computerCount;
    }
  }
}

function getNameForWinner(winner) {
  let winnerName = "";
  if (winner === "user") {
    winnerName = "Usuaria";
  } else {
    winnerName = "Computadora";
  }
  return winnerName;
}

// función reset contadores
function endGame(count, winner) {
  const winnerName = getNameForWinner(winner);
  if (count === 5) {
    resultMessage.innerHTML = `Juego terminado: alguna jugadora ha llegado a los 5 puntos. Ha ganado la ${winnerName.toUpperCase()}`;
    button.classList.add("hidden");
    selectElement.setAttribute("disabled", true);
  }
}

function resetCount() {
  playerCount = 0;
  computerCount = 0;
  playerCountElement.innerHTML = 0;
  computerCountElement.innerHTML = 0;
  userValueElem.innerHTML = "";
  computerValueElem.innerHTML = "";
}

function changeButtons() {
  button.classList.remove("hidden");
  button.setAttribute("disabled", true);
  resetButton.setAttribute("disabled", true);
}

function changeSelect() {
  selectElement.removeAttribute("disabled");
  selectElement.value = "";
}

function changeMessage() {
  resultMessage.innerHTML = "¡Vamos a jugar!";
}

// función manejadora del click
function handleButtonClick(event) {
  event.preventDefault();
  const userSelection = getWordForValueUser();
  const computerSelection = getComputerSelection(userSelection);
  const winner = compareSelections(userSelection, computerSelection);
  updateCount(winner);
  endGame(playerCount, winner);
  endGame(computerCount, winner);
}

// función manejadora del click del resetButton
function handleResetButtonClick(event) {
  event.preventDefault();
  resetCount();
  changeButtons();
  changeSelect();
  changeMessage();
}

// listeners
selectElement.addEventListener("change", enableButton);
button.addEventListener("click", handleButtonClick);
resetButton.addEventListener("click", handleResetButtonClick);
