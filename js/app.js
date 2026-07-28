/*
==========================================================
PROJECT : FinTrack V3

FILE : app.js

PURPOSE

Main JavaScript File

Handles

✓ DOM Selection
✓ CRUD
✓ Dashboard
✓ Local Storage
✓ Search
✓ Filters
✓ Sorting
==========================================================
*/


/*==========================================================
DOM ELEMENTS
==========================================================*/

// Transaction Form
const transactionForm =
document.getElementById("transaction-form");

// Form Inputs
const titleInput =
document.getElementById("title");

const amountInput =
document.getElementById("amount");

const categoryInput =
document.getElementById("category");

const typeInput =
document.getElementById("type");

const dateInput =
document.getElementById("date");

// Transaction Table
const transactionList =
document.getElementById("transaction-list");

// Dashboard
const balanceElement =
document.getElementById("balance");

const incomeElement =
document.getElementById("income");

const expenseElement =
document.getElementById("expense");

const savingsElement =
document.getElementById("savings");

// Submit Button
const submitButton =
document.querySelector(".submit-btn");

// Search & Filters
const searchInput =
document.getElementById("search-input");

const categoryFilter =
document.getElementById("category-filter");

const typeFilter =
document.getElementById("type-filter");

const sortFilter =
document.getElementById("sort-filter");


/*==========================================================
APPLICATION STATE
==========================================================*/

// Stores every transaction
let transactions = [];

// Stores the ID of the transaction currently being edited
let editingTransactionId = null;


/*==========================================================
EVENT LISTENERS
==========================================================*/

// Submit Form
transactionForm.addEventListener(
    "submit",
    addTransaction
);


/*==========================================================
ADD / UPDATE TRANSACTION
==========================================================*/

function addTransaction(event){

    // Prevent page refresh
    event.preventDefault();


    /*--------------------------------------
    READ FORM VALUES
    --------------------------------------*/

    const title =
    titleInput.value.trim();

    const amount =
    Number(amountInput.value);

    const category =
    categoryInput.value;

    const type =
    typeInput.value;

    const date =
    dateInput.value;


    /*--------------------------------------
    VALIDATION
    --------------------------------------*/

    if(title === ""){

        alert("Please enter a title.");

        return;

    }

    if(isNaN(amount) || amount <= 0){

        alert("Please enter a valid amount.");

        return;

    }

    if(date === ""){

        alert("Please select a date.");

        return;

    }


    /*--------------------------------------
    EDIT MODE
    --------------------------------------*/

    if(editingTransactionId !== null){

        const transaction =
        transactions.find(function(item){

            return item.id === editingTransactionId;

        });

        if(transaction){

            transaction.title = title;

            transaction.amount = amount;

            transaction.category = category;

            transaction.type = type;

            transaction.date = date;

        }

        editingTransactionId = null;

        submitButton.textContent =
        "Add Transaction";

        saveTransactions();

        filterTransactions();

        updateDashboard();

        transactionForm.reset();

        return;

    }


    /*--------------------------------------
    CREATE NEW TRANSACTION
    --------------------------------------*/

    const transaction = {

        id: Date.now(),

        title: title,

        amount: amount,

        category: category,

        type: type,

        date: date

    };


    /*--------------------------------------
    SAVE TRANSACTION
    --------------------------------------*/

    transactions.push(transaction);

    saveTransactions();

    filterTransactions();

    updateDashboard();

    transactionForm.reset();

}

/*==========================================================
DISPLAY TRANSACTIONS
==========================================================*/

function displayTransactions(list = transactions){

    // Remove old rows
    transactionList.innerHTML = "";

    // Variable to store all rows
    let rows = "";

    // Loop through every transaction
    list.forEach(function(transaction){

        rows += `

        <tr>

            <td>${transaction.title}</td>

            <td>${transaction.category}</td>

            <td>${transaction.type}</td>

            <td>₹${transaction.amount.toFixed(2)}</td>

            <td>${transaction.date}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editTransaction(${transaction.id})">

                    Edit

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTransaction(${transaction.id})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

    transactionList.innerHTML = rows;

}
/*==========================================================
UPDATE DASHBOARD
==========================================================*/

function updateDashboard(){

    let income = 0;

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


/*==========================================================
SAVE TRANSACTIONS
==========================================================*/
 function saveTransactions(){
    localStorage.setItem("transactions", JSON.stringify(transactions));
 }


 //load from local storage
 function loadTransactions(){
    const savedTransactions = localStorage.getItem("transactions");
    if(savedTransactions){
        transactions= JSON.parse(savedTransactions);
    }
       filterTransactions();
        updateDashboard();
 }



// DELETE TRANSACTION


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

    filterTransactions();

    updateDashboard();

}

//edit transactions
function editTransaction(id){
    const transaction = transactions.find(function(item){
        return item.id === id;
    });
    if(!transaction){
        return;
    }
    titleInput.value = transaction.title;
    amountInput.value = transaction.amount;
    categoryInput.value = transaction.category;
    typeInput.value = transaction.type;
    dateInput.value = transaction.date;
    editingTransactionId = id;
    submitButton.textContent = "Update Transaction";
} 

/*==========================================================
FILTER + SEARCH + SORT
==========================================================*/

function filterTransactions(){

    /*--------------------------------------
    READ FILTER VALUES
    --------------------------------------*/

    const searchText =
    searchInput.value.toLowerCase();

    const selectedCategory =
    categoryFilter.value;

    const selectedType =
    typeFilter.value;

    const selectedSort =
    sortFilter.value;


    /*--------------------------------------
    FILTER TRANSACTIONS
    --------------------------------------*/

    const filteredTransactions =
    transactions.filter(function(transaction){

        const matchesSearch =

            transaction.title
            .toLowerCase()
            .includes(searchText);

        const matchesCategory =

            selectedCategory === "All"

            ||

            transaction.category === selectedCategory;

        const matchesType =

            selectedType === "All"

            ||

            transaction.type === selectedType;

        return (

            matchesSearch

            &&

            matchesCategory

            &&

            matchesType

        );

    });


    /*--------------------------------------
    CREATE COPY FOR SORTING
    --------------------------------------*/

    let sortedTransactions =
    [...filteredTransactions];


    /*--------------------------------------
    SORT BY AMOUNT
    --------------------------------------*/

    if(selectedSort === "amount-asc"){

        sortedTransactions.sort(function(a,b){

            return a.amount - b.amount;

        });

    }

    if(selectedSort === "amount-desc"){

        sortedTransactions.sort(function(a,b){

            return b.amount - a.amount;

        });

    }


    /*--------------------------------------
    SORT BY DATE
    --------------------------------------*/

    if(selectedSort === "date-new"){

        sortedTransactions.sort(function(a,b){

            return new Date(b.date) -

                   new Date(a.date);

        });

    }

    if(selectedSort === "date-old"){

        sortedTransactions.sort(function(a,b){

            return new Date(a.date) -

                   new Date(b.date);

        });

    }


    /*--------------------------------------
    DISPLAY RESULT
    --------------------------------------*/

    displayTransactions(sortedTransactions);

}

searchInput.addEventListener(
    "input",
    filterTransactions
);

categoryFilter.addEventListener(
    "change",
    filterTransactions
);

typeFilter.addEventListener(
    "change",
    filterTransactions
);

sortFilter.addEventListener(

    "change",

    filterTransactions

);

// INITIALIZE APPLICATION


loadTransactions();