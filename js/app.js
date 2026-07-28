/*==========================================================
PROJECT : FinTrack V3

FILE : app.js

PURPOSE

Main JavaScript file.

Controls

- Form
- Dashboard
- Transactions

==========================================================*/

//SELECT HTML ELEMENTS
   

//transactin form 
const transactionForm = document.getElementById("transaction-form");

//title input
const titleInput = document.getElementById("title");

//amount input 
const amountInput = document.getElementById("amount");

//category
const categoryInput = document.getElementById("category");

//type
const typeInput = document.getElementById("type");

//date
const dateInput = document.getElementById("date");


// Transaction Table Body
const transactionList = document.getElementById("transaction-list");


//==========================================================
// DASHBOARD ELEMENTS
//==========================================================

const balanceElement =
document.getElementById("balance");

const incomeElement =
document.getElementById("income");

const expenseElement =
document.getElementById("expense");

const savingsElement =
document.getElementById("savings");

//==========================================================
// APPLICATION DATA
//==========================================================

// Array to store every transaction
let transactions = [];

//==========================================================
// EVENT LISTENER
//==========================================================

transactionForm.addEventListener(

    "submit",

    addTransaction

);
//==========================================================
// ADD TRANSACTION
//==========================================================

function addTransaction(event){

    // Stop page refresh
    event.preventDefault();

    // Read values from the form
const title = titleInput.value.trim();

const amount = Number(amountInput.value);

const category = categoryInput.value;

const type = typeInput.value;

const date = dateInput.value;


//==========================================================
// CREATE TRANSACTION OBJECT
//==========================================================

const transaction = {

    id: Date.now(),

    title: title,

    amount: amount,

    category: category,

    type: type,

    date: date

};

//==========================================================
// STORE TRANSACTION
//==========================================================

transactions.push(transaction);
saveTransactions();
console.log(transactions);

displayTransactions();

updateDashboard();
//==========================================================
// RESET FORM
//==========================================================

transactionForm.reset();

// Display values in the Console
console.log(title);
console.log(amount);
console.log(category);
console.log(type);
console.log(date);

}


//==========================================================
// DISPLAY TRANSACTIONS
//==========================================================

function displayTransactions() {

    // Clear the current table
    transactionList.innerHTML = "";

    // Loop through every transaction
    transactions.forEach(function(transaction) {

        const row = `
            <tr>
                <td>${transaction.title}</td>
                <td>${transaction.category}</td>
                <td>${transaction.type}</td>
                <td>₹${transaction.amount.toFixed(2)}</td>
                <td>${transaction.date}
                <td>
                <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">Delete</button>
                </td>
            </tr>
        `;

        transactionList.innerHTML += row;

    });

}


//update dashboard
  

function updateDashboard(){
    let income =0;
    let expense = 0;
    transactions.forEach(function(transaction){

    if(transaction.type === "Income"){

        income += transaction.amount;

    }

    else{

        expense += transaction.amount;

    }

});
const balance = income - expense;
const savings = balance;

balanceElement.textContent =
`₹${balance.toFixed(2)}`;

incomeElement.textContent =
`₹${income.toFixed(2)}`;

expenseElement.textContent =
`₹${expense.toFixed(2)}`;

savingsElement.textContent =
`₹${savings.toFixed(2)}`;
}


//save to local storage
 function saveTransactions(){
    localStorage.setItem("transactions", JSON.stringify(transactions));
 }


 //load from local storage
 function loadTransactions(){
    const savedTransactions = localStorage.getItem("transactions");
    if(savedTransactions){
        transactions= JSON.parse(savedTransactions);
        displayTransactions();
        updateDashboard();
    }
 }


 //==========================================================
// DELETE TRANSACTION
//==========================================================

function deleteTransaction(id){
     const confirmed = confirm(
        "Are you sure you want to delete this transaction?"
    );

    if(!confirmed){

        return;

    }

    transactions = transactions.filter(function(transaction){

        return transaction.id !== id;

    });

    saveTransactions();

    displayTransactions();

    updateDashboard();

}
 //==========================================================
// INITIALIZE APPLICATION
//==========================================================

loadTransactions();