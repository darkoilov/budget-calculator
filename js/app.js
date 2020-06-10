let calcBtn = document.getElementById("budget-submit");
let expBtn = document.getElementById("expense-submit");
let budget = document.getElementById("budget-amount");
let expense = document.getElementById("expense-amount");
let balance = document.getElementById("balance-amount");
let budgetInp = document.getElementById("budget-input");
let myExpense = document.getElementById("expense-input");
let myAmount = document.getElementById("amount-input");
let feedback = document.querySelector(".budget-feedback");
let expFeedback = document.querySelector(".expense-feedback");
let table = document.createElement("table");

var timer = setInterval(myTimer, 3000);
var timer1 = setInterval(myTimer, 3000);

function myTimer() {
  feedback.style.display = "none";
  expFeedback.style.display = "none";
}

function myBudget(value) {
  let balance = document.getElementById("balance-amount");
  let budgetInp = document.getElementById("budget-input");
  let budget = document.getElementById("budget-amount");
  let budgetVal = budgetInp.value;
  if (budgetInp.value == "" || budgetInp.value < 0) {
    feedback.style.display = "block";
    feedback.innerHTML = "Value cannot be empty or negative";
  } else {
    budget.innerText = parseFloat(budgetVal);
    balance.innerText = parseFloat(budgetVal);
  }
  color();
}

calcBtn.addEventListener("click", function(e) {
  e.preventDefault();
  myBudget(budgetInp.value);
  balance.innerText = budget.innerText - expense.innerText;
  budgetInp.value = "";
  color();
});

expBtn.addEventListener("click", function(e) {
  e.preventDefault();
  if (myExpense.value == "" || myAmount.value == "") {
    expFeedback.style.display = "block";
    expFeedback.innerHTML = "Value cannot be empty or negative";
    return false;
  } else {
    Table(myExpense.value, myAmount.value);
    myAmount.value = "";
    myExpense.value = "";
  }
});

let bottomExpenses = document.querySelector(
  "div:nth-child(3) > div.col-md-7.my-3"
);
bottomExpenses.appendChild(table);
let tr = table.insertRow();
table.appendChild(tr);
let tr1 = tr.insertCell(0);
let tr2 = tr.insertCell(1);
let tr3 = tr.insertCell(2);
let tr4 = tr.insertCell(3);
tr1.innerText = "Expense Title";
tr2.innerText = "Expense Value";
tr3.innerText = "";
tr4.innerText = "";

tr1.style.width = "33%";
tr2.style.width = "33%";

table.style.width = "100%";

function Table(title, value) {
  let tr = table.insertRow();
  table.append(tr);
  let tr1 = tr.insertCell(0);
  let tr2 = tr.insertCell(1);
  let tr3 = tr.insertCell(2);
  let tr4 = tr.insertCell(3);
  tr1.innerHTML = title;
  tr2.innerHTML = value;
  tr3.innerHTML = `<i class="fas fa-edit"></i>`;
  tr4.innerHTML = `<i class="fas fa-trash"></i>`;

  tr3.classList.add("edit-icon");
  tr4.classList.add("delete-icon");
  tr3.style.float = "left";
  tr3.style.marginLeft = "50%";
  tr4.style.float = "left";
  tr4.style.marginLeft = "10%";

  tr3.addEventListener("click", editRow);
  tr4.addEventListener("click", deleteRow);
  
  balance.innerText = parseFloat(balance.innerText) - parseFloat(value);
  expense.innerText = parseFloat(expense.innerText) + parseFloat(value);
  color();

  function form(){
    balance.innerText = parseFloat(balance.innerText) + parseFloat(value);
    expense.innerText = parseFloat(expense.innerText) - parseFloat(value);
  }

  function deleteRow(e) {
    let tr = e.currentTarget.parentNode;
    form()
    tr.remove();
    color();
  }

  function editRow(e) {
    let tr = e.currentTarget.parentNode;
    myExpense.value = title;
    myAmount.value = parseFloat(value);
  form()
    tr.remove();
    color();
  }
}
function color() {
  if (balance.innerText == 0) {
    balance.style.color = "black";
  } else if (balance.innerText < 0) {
    balance.style.color = "red";
  } else if (balance.innerText > 0) {
    balance.style.color = "blue";
  }
}

table.style.width = "100%";
table.style.textAlign = "center";
