// https://jsfiddle.net/ayoisaiah/v7usehxw/27/
// 참고자료

//// 일반적인 계산기 중첩 계산이 안됨.
// const calculator = {
//   displayValue: "0",
//   firstOperand: null,
//   waitingForSecondOperand: false,
//   operator: null,
// };

// function inputDigit(digit) {
//   const { displayValue, waitingForSecondOperand } = calculator;

//   if (waitingForSecondOperand === true) {
//     calculator.displayValue = digit;
//     calculator.waitingForSecondOperand = false;
//   } else {
//     calculator.displayValue =
//       displayValue === "0" ? digit : displayValue + digit;
//   }
// }

// function inputDecimal(dot) {
//   if (calculator.waitingForSecondOperand === true) {
//     calculator.displayValue = "0.";
//     calculator.waitingForSecondOperand = false;
//     return;
//   }

//   if (!calculator.displayValue.includes(dot)) {
//     calculator.displayValue += dot;
//   }
// }

// function handleOperator(nextOperator) {
//   const { firstOperand, displayValue, operator } = calculator;
//   const inputValue = parseFloat(displayValue);

//   if (operator && calculator.waitingForSecondOperand) {
//     calculator.operator = nextOperator;
//     return;
//   }

//   if (firstOperand == null && !isNaN(inputValue)) {
//     calculator.firstOperand = inputValue;
//   } else if (operator) {
//     const result = calculate(firstOperand, inputValue, operator);

//     calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
//     calculator.firstOperand = result;
//   }
//   calculator.waitingForSecondOperand = true;
//   calculator.operator = nextOperator;
// }

// function calculate(firstOperand, secondOperand, operator) {
//   const n1 = firstOperand,
//     n2 = secondOperand;
//   if (operator === "+") return n1 + n2;
//   if (operator === "-") return n1 - n2;
//   if (operator === "*") return n1 * n2;
//   if (operator === "/") return n1 / n2;

//   return secondOperand;
// }

// function resetCalculator() {
//   calculator.displayValue = "0";
//   calculator.firstOperand = null;
//   calculator.waitingForSecondOperand = null;
//   calculator.operator = null;
// }

// function updateDisplay() {
//   const display = document.querySelector(".cal-screen");
//   display.value = calculator.displayValue;
// }

// updateDisplay();
// const keys = document.querySelector(".cal-keys");
// keys.addEventListener("click", (e) => {
//   const { target } = e;
//   const { value } = target;
//   if (!target.matches("button")) {
//     return;
//   }
//   switch (value) {
//     case "+":
//     case "-":
//     case "*":
//     case "/":
//     case "=":
//       handleOperator(value);
//       break;
//     case ".":
//       inputDecimal(value);
//       break;
//     case "all-clear":
//       resetCalculator();
//       break;
//     default:
//       if (Number.isInteger(parseFloat(value))) {
//         inputDigit(value);
//       }
//   }

//   updateDisplay();
// });

const calculate = (n1, operator, n2) => {
  const firstNum = parseFloat(n1);
  const secondNum = parseFloat(n2);
  if (operator === "add") return firstNum + secondNum;
  if (operator === "subtract") return firstNum - secondNum;
  if (operator === "multiply") return firstNum * secondNum;
  if (operator === "divide") return firstNum / secondNum;
};

const getKeyType = (key) => {
  const { action } = key.dataset;
  // dataset
  // html에서 "data-"로 작성된 속성들이 dataset에 저장된다고 한다.
  // 그래서 dataset에서 action을 불러올 수 있다.
  if (!action) return "number";
  if (
    action === "add" ||
    action === "subtract" ||
    action === "multiply" ||
    action === "divide"
  )
    return "operator";

  return action;
};

const createResultString = (key, displayedNum, state) => {
  const keyContent = key.textContent;
  // textContent
  // innerText와 비슷한 기능을 가졌으며 공백도 포함하여 처리한다.
  // innerText보다 먼저 생겼다. 그로인해 브라우저 호환성이
  // innerText보다 높다고함.
  const keyType = getKeyType(key);
  const { firstValue, operator, modValue, previousKeyType } = state;

  if (keyType === "number") {
    return displayedNum === "0" ||
      previousKeyType === "operator" ||
      previousKeyType === "calculate"
      ? keyContent
      : displayedNum + keyContent;
  }

  if (keyType === "decimal") {
    if (!displayedNum.includes(".")) return displayedNum + ".";
    if (previousKeyType === "operator" || previousKeyType === "calculate")
      return "0.";
    return displayedNum;
  }

  if (keyType === "operator") {
    return firstValue &&
      operator &&
      previousKeyType !== "operator" &&
      previousKeyType !== "calculate"
      ? calculate(firstValue, operator, displayedNum)
      : displayedNum;
  }

  if (keyType === "clear") return 0;

  if (keyType === "calculate") {
    return firstValue
      ? previousKeyType === "calculate"
        ? calculate(displayedNum, operator, modValue)
        : calculate(firstValue, operator, displayedNum)
      : displayedNum;
  }
};

const updateCalculatorState = (
  key,
  calculator,
  calculatedValue,
  displayedNum
) => {
  const keyType = getKeyType(key);
  const {
    firstValue,
    operator,
    modValue,
    previousKeyType,
  } = calculator.dataset;

  calculator.dataset.previousKeyType = keyType;

  if (keyType === "operator") {
    calculator.dataset.operator = key.dataset.action;
    calculator.dataset.firstValue =
      firstValue &&
      operator &&
      previousKeyType !== "operator" &&
      previousKeyType !== "calculate"
        ? calculatedValue
        : displayedNum;
  }

  if (keyType === "calculate") {
    calculator.dataset.modValue =
      firstValue && previousKeyType === "calculate" ? modValue : displayedNum;
  }

  if (keyType === "clear" && key.textContent === "AC") {
    calculator.dataset.firstValue = "";
    calculator.dataset.modValue = "";
    calculator.dataset.operator = "";
    calculator.dataset.previousKeyType = "";
  }
};

const updateVisualState = (key, calculator) => {
  const keyType = getKeyType(key);
  Array.from(key.parentNode.children).forEach((k) =>
    k.classList.remove("is-depressed")
  );

  if (keyType === "operator") key.classList.add("is-depressed");
  if (keyType === "clear" && key.textContent !== "AC") key.textContent = "AC";
  if (keyType !== "clear") {
    const clearBtn = calculator.querySelector("[data-action=clear]");
    clearBtn.textContent = "CE";
  }
};

const calculator = document.querySelector(".calculator");
const display = calculator.querySelector(".cal-display");
const keys = calculator.querySelector(".cal-keys");

keys.addEventListener("click", (e) => {
  if (!e.target.matches("button")) return;
  const key = e.target;
  const displayedNum = display.textContent;
  const resultString = createResultString(
    key,
    displayedNum,
    calculator.dataset
  );

  display.textContent = resultString;
  updateCalculatorState(key, calculator, resultString, displayedNum);
  updateVisualState(key, calculator);
});
