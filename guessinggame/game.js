// const rangeValue = document.querySelector("myRange");
// const showValue = document.getElementById("showValue");

// function hendleRange(event) {
//   const currentValue = rangeValue.value;
//   console.log(currentValue);
//   showValue.innerHTML = rangeValue.value;
//   rangeValue.oninput = function () {
//     showValue.innerHTML = this.value;
//   };
// }

// function init() {
//   hendleRange();
//   rangeValue.addEventListener("input", hendleRange);
// }

// init();

//--------------------------------------------------------------------//
// Nico solution
const range = document.getElementById("js-range");
const title = document.querySelector(".js-title");
const guessForm = document.getElementById("js-guess");
const result = document.getElementById("js-result");

function handleRangeChange(e) {
  const selectedRange = title.querySelector("span");
  selectedRange.innerHTML = range.value;
}

function handleGuessSubmit(e) {
  e.preventDefault();
  const guessInput = guessForm.querySelector("input");
  if (guessInput.value === "") {
    return;
  }
  const max = range.value;
  const random = Math.ceil(Math.random() * max);
  const userGuess = parseInt(guessInput.value, 10);
  const resultSpan = result.querySelector("span");
  resultSpan.innerHTML = `
  You chose: ${userGuess},
  the machine chose: ${random}.<br />
  <strong>${userGuess === random ? "You won!" : "You lost!"}</strong>
  `;
}

guessForm.addEventListener("submit", handleGuessSubmit);
range.addEventListener("input", handleRangeChange);
