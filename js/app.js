/*
==========================================================
PROJECT : FinTrack V3

FILE : app.js

PURPOSE
Main JavaScript file.

This file controls

1. Add Transaction
2. Display Transactions
3. Dashboard
4. Local Storage
5. Search
6. Filter
7. Sorting
8. Edit
9. Delete

==========================================================
*/


/*==========================================================
DOM ELEMENTS
==========================================================*/

// Transaction Form
const transactionForm = document.getElementById("transaction-form");

const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const typeInput = document.getElementById("type");
const dateInput = document.getElementById("date");

// Transaction Table
const transactionList =
document.getElementById("transaction-list");

// Dashboard Cards
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

/*==========================================================
CHART CANVAS
==========================================================*/

const expenseChartCanvas =
document.getElementById("expenseChart");

const incomeExpenseChartCanvas =
document.getElementById("incomeExpenseChart");

const monthlyExpenseChartCanvas =
document.getElementById("monthlyExpenseChart");
// Search
const searchInput =
document.getElementById("search-input");

// Filters
const categoryFilter =
document.getElementById("category-filter");

const typeFilter =
document.getElementById("type-filter");

const sortFilter =
document.getElementById("sort-filter");

const exportCsvButton =
document.getElementById("export-csv-btn");

const exportPdfButton =
document.getElementById("export-pdf-btn");
/*==========================================================
BUDGET PLANNER
==========================================================*/

const budgetForm =
document.getElementById("budget-form");

const budgetCategoryInput =
document.getElementById("budget-category");

const budgetAmountInput =
document.getElementById("budget-amount");

const budgetList =
document.getElementById("budget-list");

/*==================================================
SAVINGS GOAL
==================================================*/

const goalForm =
document.getElementById("goal-form");

const goalAmountInput =
document.getElementById("goal-amount");

const goalCard =
document.getElementById("goal-card");
/*==========================================================
APPLICATION DATA
==========================================================*/

let transactions = [];

/*==========================================================
CHART OBJECTS
==========================================================*/

let expenseChart = null;

let incomeExpenseChart = null;

let monthlyExpenseChart = null;


/*==========================================================
BUDGET DATA
==========================================================*/

let budgets = {};
let savingsGoal = 0;
// Edit Mode
let editingTransactionId = null;


/*==========================================================
EVENT LISTENERS
==========================================================*/

transactionForm.addEventListener(
    "submit",
    addTransaction
);

budgetForm.addEventListener(

    "submit",

    saveBudget

);
goalForm.addEventListener(

    "submit",

    saveGoal

);
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

exportCsvButton.addEventListener(

    "click",

    exportCSV

);

exportPdfButton.addEventListener(

    "click",

    exportPDF

);
/*==========================================================
ADD TRANSACTION
==========================================================*/

function addTransaction(event){

    event.preventDefault();

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

    }else{

        const transaction = {

            id: Date.now(),

            title,

            amount,

            category,

            type,

            date

        };

        transactions.push(transaction);

    }

    saveTransactions();

    filterTransactions();

    updateDashboard();

    transactionForm.reset();

}


/*==========================================================
DISPLAY TRANSACTIONS
==========================================================*/

function displayTransactions(list = transactions){

    transactionList.innerHTML = "";

    list.forEach(function(transaction){

        transactionList.innerHTML += `

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

        }else{

            expense += transaction.amount;

        }

    });

    const balance = income - expense;

    balanceElement.textContent =
    `₹${balance.toFixed(2)}`;

    incomeElement.textContent =
    `₹${income.toFixed(2)}`;

    expenseElement.textContent =
    `₹${expense.toFixed(2)}`;

    savingsElement.textContent =
    `₹${balance.toFixed(2)}`;

    updateExpenseChart();

updateIncomeExpenseChart();

updateMonthlyExpenseChart();

displayBudgets();
displayGoal();
}


/*==========================================================
LOCAL STORAGE
==========================================================*/

function saveTransactions(){

    localStorage.setItem(

        "transactions",

        JSON.stringify(transactions)

    );

}

function loadTransactions(){

    const savedTransactions =
    localStorage.getItem("transactions");

    if(savedTransactions){

        transactions =
        JSON.parse(savedTransactions);

    }

    filterTransactions();

    updateDashboard();

}


/*==========================================================
DELETE TRANSACTION
==========================================================*/

function deleteTransaction(id){

    const confirmed = confirm(

        "Delete this transaction?"

    );

    if(!confirmed){

        return;

    }

    transactions =
    transactions.filter(function(transaction){

        return transaction.id !== id;

    });

    saveTransactions();

    filterTransactions();

    updateDashboard();

}


/*==========================================================
EDIT TRANSACTION
==========================================================*/

function editTransaction(id){

    const transaction =
    transactions.find(function(item){

        return item.id === id;

    });

    if(!transaction){

        return;

    }

    titleInput.value =
    transaction.title;

    amountInput.value =
    transaction.amount;

    categoryInput.value =
    transaction.category;

    typeInput.value =
    transaction.type;

    dateInput.value =
    transaction.date;

    editingTransactionId = id;

    submitButton.textContent =
    "Update Transaction";

}


/*==========================================================
FILTER + SEARCH + SORT
==========================================================*/

function filterTransactions(){

    const searchText =
    searchInput.value.toLowerCase();

    const selectedCategory =
    categoryFilter.value;

    const selectedType =
    typeFilter.value;

    const selectedSort =
    sortFilter.value;

    let filteredTransactions =
    transactions.filter(function(transaction){

        const matchesSearch =
        transaction.title
        .toLowerCase()
        .includes(searchText);

        const matchesCategory =

        selectedCategory === "All" ||

        transaction.category === selectedCategory;

        const matchesType =

        selectedType === "All" ||

        transaction.type === selectedType;

        return (

            matchesSearch &&

            matchesCategory &&

            matchesType

        );

    });

    let sortedTransactions =
    [...filteredTransactions];

    switch(selectedSort){

        case "Newest":

            sortedTransactions.sort(

                (a,b)=>

                new Date(b.date)-new Date(a.date)

            );

            break;

        case "Oldest":

            sortedTransactions.sort(

                (a,b)=>

                new Date(a.date)-new Date(b.date)

            );

            break;

        case "Highest":

            sortedTransactions.sort(

                (a,b)=>

                b.amount-a.amount

            );

            break;

        case "Lowest":

            sortedTransactions.sort(

                (a,b)=>

                a.amount-b.amount

            );

            break;

    }

    displayTransactions(

        sortedTransactions

    );

}

function updateExpenseChart(){

    const totals = {};

    transactions.forEach(function(transaction){

        if(transaction.type !== "Expense") return;

        if(!totals[transaction.category]){

            totals[transaction.category] = 0;

        }

        totals[transaction.category] += transaction.amount;

    });

    const labels = Object.keys(totals);

    const data = Object.values(totals);

    if(expenseChart){

        expenseChart.destroy();

    }

    expenseChart = new Chart(expenseChartCanvas,{

        type:"pie",

        data:{

            labels:labels,

            datasets:[{

                data:data,

                backgroundColor:[
                    "#3B82F6",
                    "#22C55E",
                    "#F59E0B",
                    "#EF4444",
                    "#8B5CF6",
                    "#14B8A6",
                    "#EC4899",
                    "#84CC16"
                ]

            }]

        }

    });

}
function updateIncomeExpenseChart(){

    let income = 0;

    let expense = 0;

    transactions.forEach(function(transaction){

        if(transaction.type==="Income"){

            income += transaction.amount;

        }else{

            expense += transaction.amount;

        }

    });

    if(incomeExpenseChart){

        incomeExpenseChart.destroy();

    }

    incomeExpenseChart =
    new Chart(incomeExpenseChartCanvas,{

        type:"bar",

        data:{

            labels:["Income","Expense"],

            datasets:[{

                data:[income,expense],

                backgroundColor:[

                    "#22C55E",

                    "#EF4444"

                ]

            }]

        }

    });

}
function updateMonthlyExpenseChart(){

    const totals = {};

    transactions.forEach(function(transaction){

        if(transaction.type!=="Expense") return;

        const month =
        new Date(transaction.date)

        .toLocaleString(

            "default",

            {

                month:"long"

            }

        );

        if(!totals[month]){

            totals[month]=0;

        }

        totals[month]+=transaction.amount;

    });

    if(monthlyExpenseChart){

        monthlyExpenseChart.destroy();

    }

    monthlyExpenseChart =
    new Chart(monthlyExpenseChartCanvas,{

        type:"line",

        data:{

            labels:Object.keys(totals),

            datasets:[{

                data:Object.values(totals),

                fill:true,

                tension:.3

            }]

        }

    });

}
function saveBudget(event){

    event.preventDefault();

    const category =
    budgetCategoryInput.value;

    const amount =
    Number(budgetAmountInput.value);

    budgets[category]=amount;

    displayBudgets();

    budgetForm.reset();

}
function displayBudgets(){

    budgetList.innerHTML="";

    for(const category in budgets){

        const budget =
        budgets[category];

        let spent = 0;

        transactions.forEach(function(transaction){

            if(

                transaction.type==="Expense" &&

                transaction.category===category

            ){

                spent+=transaction.amount;

            }

        });

        const percentage =
        budget > 0
            ? Math.min((spent/budget)*100,100)
            : 0;

        let color="#22C55E";

        if(percentage>=80){

            color="#F59E0B";

        }

        if(spent>budget){

            color="#EF4444";

        }

        budgetList.innerHTML+=`

        <div class="budget-card">

            <h3>${category}</h3>

            <p>

            ₹${spent.toFixed(2)}

            /

            ₹${budget.toFixed(2)}

            </p>

            <div class="progress-bar">

                <div

                class="progress"

                style="

                width:${percentage}%;

                background:${color};

                ">

                </div>

            </div>

            <p>

            ${percentage.toFixed(1)}%

            Used

            </p>

        </div>

        `;

    }

}

/*==================================================
SAVE GOAL
==================================================*/

function saveGoal(event){

    event.preventDefault();

    savingsGoal = Number(

        goalAmountInput.value

    );

    displayGoal();

    goalForm.reset();

}
/*==================================================
DISPLAY GOAL
==================================================*/

function displayGoal(){

    if(savingsGoal <= 0){

        goalCard.innerHTML = "";

        return;

    }

    let income = 0;

    let expense = 0;

    transactions.forEach(function(transaction){

        if(transaction.type === "Income"){

            income += transaction.amount;

        }else{

            expense += transaction.amount;

        }

    });

    const savings = income - expense;

    const percentage =

    Math.min(

        (savings / savingsGoal) * 100,

        100

    );

    const remaining =

    Math.max(

        savingsGoal - savings,

        0

    );

    let color = "#22C55E";

    if(percentage >= 80){

        color = "#F59E0B";

    }

    if(savings >= savingsGoal){

        color = "#16A34A";

    }

    goalCard.innerHTML = `

    <div class="goal-card">

        <h3>

            Goal

            ₹${savingsGoal.toFixed(2)}

        </h3>

        <p>

            Current Savings

            ₹${savings.toFixed(2)}

        </p>

        <div class="progress-bar">

            <div

            class="progress"

            style="

                width:${percentage}%;

                background:${color};

            ">

            </div>

        </div>

        <p>

            ${percentage.toFixed(1)}%

            Completed

        </p>

        <p>

            Remaining:

            ₹${remaining.toFixed(2)}

        </p>

    </div>

    `;

}
/*==================================================
EXPORT CSV
==================================================*/

function exportCSV(){

    if(transactions.length === 0){

        alert("No transactions available.");

        return;

    }

    let csv =

    "Title,Category,Type,Amount,Date\n";

    transactions.forEach(function(transaction){

        csv +=

        `${transaction.title},` +

        `${transaction.category},` +

        `${transaction.type},` +

        `${transaction.amount},` +

        `${transaction.date}\n`;

    });

    const blob =

    new Blob(

        [csv],

        {

            type:"text/csv"

        }

    );

    const url =

    URL.createObjectURL(blob);

    const link =

    document.createElement("a");

    link.href = url;

    link.download =

    "FinTrack-Transactions.csv";

    link.click();

    URL.revokeObjectURL(url);

}

/*==================================================
EXPORT PDF
==================================================*/

function exportPDF(){

    if(transactions.length === 0){

        alert("No transactions available.");

        return;

    }

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.text("FinTrack Report", 20, 20);

    // Table Header
    doc.setFontSize(12);

    let y = 40;

    doc.text("Title", 20, y);
    doc.text("Category", 60, y);
    doc.text("Type", 110, y);
    doc.text("Amount", 150, y);
    doc.text("Date", 180, y);

    y += 10;

    let income = 0;
    let expense = 0;

    transactions.forEach(function(transaction){

        doc.text(transaction.title, 20, y);
        doc.text(transaction.category, 60, y);
        doc.text(transaction.type, 110, y);
        doc.text(`rs.${transaction.amount}`, 150, y);
        doc.text(transaction.date, 180, y);

        if(transaction.type === "Income"){

            income += transaction.amount;

        }else{

            expense += transaction.amount;

        }

        y += 10;

        // Add new page if needed
        if(y > 270){

            doc.addPage();

            y = 20;

        }

    });

    const balance = income - expense;

    y += 15;

    doc.setFontSize(14);

    doc.text(`Income : rs.${income.toFixed(2)}`,20,y);

    y += 10;

    doc.text(`Expense : rs.${expense.toFixed(2)}`,20,y);

    y += 10;

    doc.text(`Balance : rs.${balance.toFixed(2)}`,20,y);

    doc.save("FinTrack-Report.pdf");

}

/*==========================================================
INITIALIZE
==========================================================*/

loadTransactions();

/*==========================================================
TOAST NOTIFICATION SYSTEM
==========================================================*/

/*
This function creates a notification (toast).

Parameters:

message -> Text to display.

type -> success | error | warning
*/

function showToast(message, type = "success") {

    // Find the toast container
    const container = document.getElementById("toast-container");

    // Create a new div
    const toast = document.createElement("div");

    // Add CSS classes
    toast.classList.add("toast");
    toast.classList.add(type);

    // Set the message
    toast.textContent = message;

    // Add toast to the page
    container.appendChild(toast);

    // Remove it automatically after 3 seconds
    setTimeout(function () {

        toast.remove();

    }, 3000);

}
showToast("Welcome to FinTrack!", "success");