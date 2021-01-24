//--------------------------------------------------//
/* 
Mouse Control 
*/

// const title = document.querySelector("#title");

// document.title = "Come on Jeju";

// const BASE_COLOR = "rgb(250, 128, 114)";
// const ENTER_COLOR = "#7f8c8d";
// const OVER_COLOR = "#25A5A7";
// const RESIZE_COLOR = "#5325A7";
// const CONTEXT_COLOR = "#39A725";

// function handleResize() {
//   title.innerHTML = "resize~!";
//   title.style.color = RESIZE_COLOR;
// }

// function handleEnter() {
//   title.innerHTML = "mouse is here";
//   title.style.color = ENTER_COLOR;
// }

// function handleOver() {
//   title.innerHTML = "mouse is gone";
//   title.style.color = OVER_COLOR;
// }

// function handleClick() {
//   title.innerHTML = "That was a right click!";
//   title.style.color = CONTEXT_COLOR;
// }

// // 초기화
// function init() {
//   title.style.color = BASE_COLOR;
//   window.addEventListener("resize", handleResize);
//   title.addEventListener("mouseover", handleEnter);
//   title.addEventListener("mouseout", handleOver);
//   window.addEventListener("contextmenu", handleClick);
// }

// init();

//--------------------------------------------------//

/* 
Change BackgroundColor interactive
*/

// const body = document.querySelector("body");

// const SMALL_COLOR = "red";
// const MEDIUM_COLOR = "blue";
// const LARGE_COLOR = "green";

// function windowsSize() {
//   let windowsWidth = window.innerWidth;
//   console.log(windowsWidth);
//   if (windowsWidth < 500) {
//     body.style.backgroundColor = SMALL_COLOR;
//   } else if (windowsWidth > 800) {
//     body.style.backgroundColor = MEDIUM_COLOR;
//   } else {
//     body.style.backgroundColor = LARGE_COLOR;
//   }
// }

// window.addEventListener("resize", windowsSize);

//// nom_soliution
// const body = document.body;

// const BIG_SCREEN = "bigScreen";
// const MEDIUM_SCREEN = "mediumScreen";
// const SMALL_SCREEN = "smallScreen";

// function handleResize() {
//   const width = window.innerWidth;
//   if (width > 1000) {
//     body.classList.add(BIG_SCREEN);
//     body.classList.remove(MEDIUM_SCREEN);
//   } else if (width <= 1140 && width >= 700) {
//     body.classList.add(MEDIUM_SCREEN);
//     body.classList.remove(BIG_SCREEN, SMALL_SCREEN);
//   } else {
//     body.classList.remove(MEDIUM_SCREEN);
//     body.classList.add(SMALL_SCREEN);
//   }
// }

// window.addEventListener("resize", handleResize);

//--------------------------------------------------//

// Go to clock.js

//--------------------------------------------------//
