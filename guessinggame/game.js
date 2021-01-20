const rangeValue = document.querySelector("myRange");
const showValue = document.getElementById("showValue");

function hendleRange(event) {
  const currentValue = rangeValue.value;
  console.log(currentValue);
  showValue.innerHTML = rangeValue.value;
  rangeValue.oninput = function () {
    showValue.innerHTML = this.value;
  };
}

function init() {
  hendleRange();
  rangeValue.addEventListener("input", hendleRange);
}

init();
