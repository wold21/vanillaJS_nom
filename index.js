const title = document.querySelector("#title");

document.title = "Come on Jeju";

const BASE_COLOR = "rgb(250, 128, 114)";
const ENTER_COLOR = "#7f8c8d";
const OVER_COLOR = "#25A5A7";
const RESIZE_COLOR = "#5325A7";
const CONTEXT_COLOR = "#39A725";

function handleResize() {
  title.innerHTML = "resize~!";
  title.style.color = RESIZE_COLOR;
}

function handleEnter() {
  title.innerHTML = "mouse is here";
  title.style.color = ENTER_COLOR;
}

function handleOver() {
  title.innerHTML = "mouse is gone";
  title.style.color = OVER_COLOR;
}

function handleClick() {
  title.innerHTML = "That was a right click!";
  title.style.color = CONTEXT_COLOR;
}

// 초기화
function init() {
  title.style.color = BASE_COLOR;
  window.addEventListener("resize", handleResize);
  title.addEventListener("mouseover", handleEnter);
  title.addEventListener("mouseout", handleOver);
  window.addEventListener("contextmenu", handleClick);
}

init();
