/* D-day counter */

const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h2");

const xmasDay = new Date("December 25, 2021, 0:00:00");

function ChristmasCounter() {
  const date = new Date().getTime();
  const gap = xmasDay - date;
  const day = Math.ceil(gap / (1000 * 60 * 60 * 24));
  const hour = Math.ceil((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const min = Math.ceil((gap % (1000 * 60 * 60)) / (1000 * 60));
  const sec = Math.ceil((gap % (1000 * 60)) / 1000);
  clockTitle.innerText = `${day}일 ${hour}시간 ${min}분 ${sec}초`;
}

function init() {
  ChristmasCounter();
  setInterval(ChristmasCounter, 1000);
}

init();
