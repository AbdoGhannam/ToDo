////////////////////////////////////
// Select all elements

const toggleDarkMode = document.querySelector(".theme");
const backgroundImg = document.querySelector(".bacground");
const todoInp = document.querySelector(".todo-inp");
const itemCount = document.querySelector(".count span");
const mobCount = document.querySelector(".mob-count span");
const todosList = document.querySelector(".simple-list");
const removeBtn = document.querySelector(".remove");
const clearBtn = document.querySelector(".clear");
const mobClearBtn = document.querySelector(".mob-clear");

// Darke mode
// 0 is light AND 1 is dark
let modeNum = 0;
toggleDarkMode.addEventListener("click", function (e) {
  const modeIsLight = modeNum == 0;
  document.body.classList.add(modeIsLight ? "theme--2" : "theme--1");
  document.body.classList.remove(modeIsLight ? "theme--1" : "theme--2");
  toggleDarkMode.src = `images/icon-mode--${modeNum}.svg`;

  modeNum = (modeNum + 1) % 2;
});

///////////////////
// Count Items left

itemCount.innerText = document.querySelectorAll(".list").length;
mobCount.innerText = document.querySelectorAll(".list").length;

////////////////////////////
// UPDATE THE COUNT OF ITEMS

function updateCount(num) {
  itemCount.innerText = +itemCount.innerText + num;
  mobCount.innerText = +mobCount.innerText + num;
}

/////////////////
// ADD NEW TODO !
todoInp.addEventListener("keydown", function (e) {
  if (e.key == "Enter" && e.target.value.length > 0) {
    addNewTodo(e.target.value);
    e.target.value = "";
  }
});

function addNewTodo(todoText) {
  const item = document.createElement("li");
  item.innerHTML = `
          <label class="list">
            <input class="checkbox" type="checkbox" />
            <span class="text">${todoText}</span>
          </label>
          <div class="remove"></div>
        `;

  todosList.append(item);
  updateCount(1);
}

//////////////
// DELETE TODO

todosList.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove")) removeTodo(e.target.parentElement);
});

function removeTodo(item) {
  item.remove();
  updateCount(-1);
}

/////////////////////
// FILTERING THE LIST

document.querySelectorAll(".filters input").forEach((radio) => {
  radio.addEventListener("change", function (e) {
    filterList(e.target.id);
  });
});

function filterList(id) {
  const allItems = document.querySelectorAll("li");

  switch (id) {
    case "all":
      allItems.forEach((el) => {
        el.classList.remove("hidden");
      });
      break;
    case "active":
      allItems.forEach((el) => {
        if (el.querySelector("input").checked) {
          el.classList.add("hidden");
        } else {
          el.classList.remove("hidden");
        }
      });
      break;
    default:
      allItems.forEach((el) => {
        if (el.querySelector("input").checked) {
          el.classList.remove("hidden");
        } else {
          el.classList.add("hidden");
        }
      });
  }
}

////////////////////////////
// CLEAR ALL COMPLETED TODOS

function clearCompletedTodos() {
  const itemChecked = document.querySelectorAll(
    '.list input[type="checkbox"]:checked'
  );
  itemChecked.forEach((item) => {
    removeTodo(item.closest("li"));
  });
}

clearBtn.addEventListener("click", clearCompletedTodos);
mobClearBtn.addEventListener("click", clearCompletedTodos);

window.addEventListener("load", () => {
  document.querySelector(".preloader").style.display = "none";
});
