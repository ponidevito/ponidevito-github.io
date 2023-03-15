// Custom Scripts
const html = document.querySelector("html");
let btnResult = document.querySelector(".form__resultBtn");
let btnXo = document.querySelectorAll(".form-btn");
let result = document.querySelector(".form__result");
let btn1 = document.querySelector(".form__btn1");
let btn2 = document.querySelector(".form__btn2");

// arrays
let massive = [];
let mass = [];
let xo = [];
let number = [];
let form = document.forms["form"];
let carbohydrates = form.carbohydrates;
let totalWeight = form.totalWeight;

// add button info
function addInfo() {
  btnXo.forEach((item) => {
    item.addEventListener("click", (event) => {
      btnXo.forEach((item) => {
        item.style.backgroundColor = "rgb(211, 241, 170)";
      });
      item.style.backgroundColor = "rgb(140, 211, 41)";
      xo.push(item.value);
      result.innerHTML = "";
      event.preventDefault();
    });
  });
  return true;
}
addInfo();

// function push value to array

function pushValue(event) {
  mass.push(carbohydrates.value);
  number.push(totalWeight.value);
  if (xo !== 0) {
    let sum =
      (mass.reduce((a, b) => a + b, 0) / xo) *
      number.reduce((a, b) => a + b, 0);
    massive.push(sum);
    let finalSum = massive.toString();
    let a = finalSum.split(",").map(Number);
    let summa = parseFloat(a.join(""));
    if (isNaN(summa)) {
      mass = [];
      number = [];
      massive = [];
      xo = [];
      pushValue(event);
    } else {
      result.textContent = "";
      result.textContent += `${(summa / 100).toFixed(2)}`;
      event.preventDefault();
      console.log(summa);
      resetAll();
      carbohydrates.style.border = "1px solid rgb(124, 231, 241)";
      return true;
    }
  }
}

btnResult.addEventListener("click", pushValue);

function pushValue(event) {
  mass.push(carbohydrates.value);
  number.push(totalWeight.value);
  if (xo !== 0) {
    let sum =
      (mass.reduce((a, b) => a + b, 0) / xo) *
      number.reduce((a, b) => a + b, 0);
    massive.push(sum);
    let finalSum = massive.toString();
    let a = finalSum.split(",").map(Number);
    let summa = parseFloat(a.join(""));
    if (isNaN(summa)) {
      mass = [];
      number = [];
      massive = [];
      xo = [];
      pushValue(event);
    } else {
      result.textContent = "";
      result.textContent += `${(summa / 100).toFixed(2)}`;
      event.preventDefault();
      console.log(summa);
      resetAll();
      carbohydrates.style.border = "1px solid rgb(124, 231, 241)";
      return true;
    }
  }
}

btnResult.addEventListener("click", pushValue);

//function reset values
function resetAll() {
  massive = [];
  mass = [];
  xo = [];
  number = [];
  carbohydrates.value = "";
  totalWeight.value = "";
  btnXo.forEach((item) => {
    item.style.backgroundColor = "#d3f1aa";
    btnResult.setAttribute("disabled", "");
  });
  return true;
}

// reset button xo value
function resetBtnValue(event) {
  let xo = [];
  xo.push(event.target.value);
}
btn1.addEventListener("click", resetBtnValue);
btn2.addEventListener("click", resetBtnValue);

// regular expression
let carbonRegExp = /^[0-9]{1,20}$/;
carbohydrates.oninput = () => {
  let loginValid = carbonRegExp.test(carbohydrates.value);
  if (loginValid) {
    carbohydrates.style.border = "1px solid rgb(124, 231, 241)";
    if (carbohydrates.value > 100) {
      carbohydrates.value = carbohydrates.value.slice(0, 2);
      document.querySelector(".form__modal-carbon").classList.add("_active");
      carbohydrates.style.border = "1px solid red";
    } else if (carbohydrates.value < 1) {
      document
        .querySelector(".form__modal-carbon-second")
        .classList.add("_active");
      carbohydrates.style.border = "1px solid red";
    } else {
      document.querySelector(".form__modal-carbon").classList.remove("_active");
      document
        .querySelector(".form__modal-carbon-second")
        .classList.remove("_active");
    }
  } else {
    carbohydrates.style.border = "1px solid red";
  }
};

// regular expression
let totalRegExp = /^[0-9]{2,20}$/;
totalWeight.oninput = () => {
  let loginValid = totalRegExp.test(totalWeight.value);
  if (loginValid) {
    totalWeight.style.border = "1px solid rgb(124, 231, 241)";
  } else {
    totalWeight.style.border = "1px solid red";
  }
};

// This code adds the checking function that sets the disabled property of the btnResult button based on the user input in the carbohydrates and totalWeight input fields, as well as the state of the btn1 and btn2 buttons.
const checking = () =>
  (btnResult.disabled =
    carbohydrates.value.length < 1 ||
    carbohydrates.value > 100 ||
    carbohydrates.value < 1 ||
    totalWeight.value.length < 2 ||
    (btn1.style.backgroundColor !== "rgb(140, 211, 41)") &
      (btn2.style.backgroundColor !== "rgb(140, 211, 41)"));

carbohydrates.addEventListener("input", checking);
totalWeight.addEventListener("input", checking);
btn1.addEventListener("click", checking);
btn2.addEventListener("click", checking);

// This function adds an event listener to the html object, which allows to track all clicks on the page. On every click, it checks if the click was not made on an element with the "HTML" or "BODY" tag
html.addEventListener("click", function (e) {
  if (e.target.tagName !== "HTML" || !e.target.tagName == "BODY") {
    document.querySelector(".form__modal-carbon").classList.remove("_active");
    document
      .querySelector(".form__modal-carbon-second")
      .classList.remove("_active");
  }
});

