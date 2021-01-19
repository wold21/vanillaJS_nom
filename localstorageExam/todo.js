const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  pendingList = document.querySelector(".js-pendingList"),
  finishedList = document.querySelector(".js-finishedList");

const PENDING_LS = "pending";
const FINISHED_LS = "finished";

let pendingKey = [];
let finishedKey = [];
let idNumbers = 1;

function delToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  console.log(li);
  if (li.parentNode === pendingList) {
    pendingList.removeChild(li);
    const cleanToDos = pendingKey.filter(function (pending) {
      return pending.id !== parseInt(li.id);
    });
    pendingKey = cleanToDos;
    saveToDos();
  } else if (li.parentNode === finishedList) {
    finishedList.removeChild(li);
    const cleanFinished = finishedKey.filter(function (finished) {
      return finished.id !== parseInt(li.id);
    });
    finishedKey = cleanFinished;
    saveFinToDos();
  }
}

function changeToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const pendingText = li.lastChild.innerText;
  paintFinished(pendingText);
  pendingList.removeChild(li);
  const cleanToDos = pendingKey.filter(function (pending) {
    return pending.id !== parseInt(li.id);
  });
  pendingKey = cleanToDos;
  saveToDos();
}

function reToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const finishedText = li.lastChild.innerText;
  paintPending(finishedText);
  finishedList.removeChild(li);
  const cleanFinished = finishedKey.filter(function (finished) {
    return finished.id !== parseInt(li.id);
  });
  finishedKey = cleanFinished;
  saveFinToDos();
}

function saveFinToDos() {
  localStorage.setItem(FINISHED_LS, JSON.stringify(finishedKey));
}

function saveToDos() {
  localStorage.setItem(PENDING_LS, JSON.stringify(pendingKey));
}

function paintFinished(text) {
  // console.log(`fin ${text}`);
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const reBtn = document.createElement("button");
  const finspan = document.createElement("span");
  const newID = idNumbers;
  idNumbers += 1;
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", delToDo);
  reBtn.innerHTML = "💦";
  reBtn.addEventListener("click", reToDo);
  finspan.innerText = text;
  li.appendChild(reBtn);
  li.appendChild(delBtn);
  li.appendChild(finspan);
  finishedList.appendChild(li);
  li.id = newID;
  const toDoObj = {
    text: text,
    id: newID,
  };
  finishedKey.push(toDoObj);
  saveFinToDos();
}

function paintPending(text) {
  // console.log(`pending ${text}`);
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const finBtn = document.createElement("button");
  const penspan = document.createElement("span");
  const newID = idNumbers;
  idNumbers += 1;
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", delToDo);
  finBtn.innerHTML = "✅";
  finBtn.addEventListener("click", changeToDo);
  penspan.innerText = text;

  li.appendChild(finBtn);
  li.appendChild(delBtn);
  li.appendChild(penspan);
  pendingList.appendChild(li);
  li.id = newID;
  const toDoObj = {
    text: text,
    id: newID,
  };
  pendingKey.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintPending(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedPendingList = localStorage.getItem(PENDING_LS);
  const loadedFinishedList = localStorage.getItem(FINISHED_LS);
  if (loadedPendingList !== null) {
    const parsedToDos = JSON.parse(loadedPendingList);
    parsedToDos.forEach(function (pendingToDo) {
      paintPending(pendingToDo.text);
    });
  }
  if (loadedFinishedList !== null) {
    const parsedToDos = JSON.parse(loadedFinishedList);
    parsedToDos.forEach(function (finishedToDo) {
      paintFinished(finishedToDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
