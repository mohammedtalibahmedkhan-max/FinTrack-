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

/*=========================================
LOGIN PROTECTION
=========================================*/

const loggedIn =

localStorage.getItem("loggedIn")==="true" ||

sessionStorage.getItem("loggedIn")==="true";

if(!loggedIn){

window.location="login.html";

}
/*==========================================================
DOM ELEMENTS
==========================================================*/
const logoutButton =
document.getElementById("logout-btn");
// Transaction Form
const transactionForm = document.getElementById("transaction-form");

const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const typeInput = document.getElementById("type");
const dateInput = document.getElementById("date");
const recurringInput =
document.getElementById("recurring");
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

const goalNameInput =
document.getElementById("goal-name");

const goalAmountInput =
document.getElementById("goal-amount");

const goalList =
document.getElementById("goal-list");

const notificationContainer =
document.getElementById("notification-container");

const insightsContainer =
document.getElementById("insights-container");
/*==========================================================
LOADING ELEMENT
==========================================================*/

const loadingOverlay =
document.getElementById(
    "loading-overlay"
);
/*==========================================================
ANALYTICS ELEMENTS
==========================================================*/

const highestExpenseElement =
document.getElementById("highest-expense");

const highestIncomeElement =
document.getElementById("highest-income");

const averageTransactionElement =
document.getElementById("average-transaction");

const totalTransactionsElement =
document.getElementById("total-transactions");

const topCategoryElement =
document.getElementById("top-category");

const monthlyExpenseElement =
document.getElementById("monthly-expense");

const settings =

JSON.parse(

localStorage.getItem("settings")

) || {};

const currency =

settings.currency || "₹";
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
let goals = [];
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

logoutButton.addEventListener(

"click",

function(){

localStorage.removeItem(

"loggedIn"

);

window.location="login.html";

});
/*==========================================================
ADD TRANSACTION
==========================================================*/

function addTransaction(event){

    event.preventDefault();

    showLoader();

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

    const recurring =
recurringInput.value;
    const isEditing = editingTransactionId !== null;

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

            date,

            recurring

        };

        transactions.push(transaction);

    }

    saveTransactions();

    filterTransactions();

    updateDashboard();

    setTimeout(function(){

    transactionForm.reset();

    showNotification(

    "Success",

    "Transaction saved successfully.",

    "success"

);

    hideLoader();

    showToast(

        isEditing
            ? "Transaction updated successfully!"
            : "Transaction added successfully!",

        "success"

    );

},500);
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

            <td>${currency}${transaction.amount.toFixed(2)}</td>

            <td>

    ${transaction.date}

    <br>

    <small>

        ${transaction.recurring}

    </small>

</td>

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
`${currency}${balance.toFixed(2)}`;

    incomeElement.textContent =
    `${currency}${income.toFixed(2)}`;

    expenseElement.textContent =
    `${currency}${expense.toFixed(2)}`;

    savingsElement.textContent =
    `${currency}${balance.toFixed(2)}`;

    updateExpenseChart();

updateIncomeExpenseChart();

updateMonthlyExpenseChart();

displayBudgets();
displayGoals();
updateInsights();
updateAnalytics();
}
/*==========================================================
UPDATE ANALYTICS
==========================================================*/

function updateAnalytics(){

    let highestExpense = 0;
    let highestIncome = 0;
    let totalAmount = 0;
    let monthlyExpense = 0;

    const categoryCount = {};

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    transactions.forEach(function(transaction){

        totalAmount += transaction.amount;

        categoryCount[transaction.category] =
            (categoryCount[transaction.category] || 0) + 1;

        if(transaction.type === "Expense"){

            if(transaction.amount > highestExpense){

                highestExpense = transaction.amount;

            }

            const transactionDate = new Date(transaction.date);

            if(
                transactionDate.getMonth() === currentMonth &&
                transactionDate.getFullYear() === currentYear
            ){

                monthlyExpense += transaction.amount;

            }

        }else{

            if(transaction.amount > highestIncome){

                highestIncome = transaction.amount;

            }

        }

    });

    const average =
        transactions.length
        ? totalAmount / transactions.length
        : 0;

    let topCategory = "None";
    let maxCount = 0;

    for(const category in categoryCount){

        if(categoryCount[category] > maxCount){

            maxCount = categoryCount[category];
            topCategory = category;

        }

    }

    highestExpenseElement.textContent =
        `${currency}${highestExpense.toFixed(2)}`;

    highestIncomeElement.textContent =
        `${currency}${highestIncome.toFixed(2)}`;

    averageTransactionElement.textContent =
        `${currency}${average.toFixed(2)}`;

    totalTransactionsElement.textContent =
        transactions.length;

    topCategoryElement.textContent =
        topCategory;

    monthlyExpenseElement.textContent =
        `${currency}${monthlyExpense.toFixed(2)}`;

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

    showNotification(

    "Deleted",

    "Transaction removed.",

    "warning"

);
    showToast(

    "Transaction deleted successfully!",

    "warning"

);
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

    showToast(

    "Budget saved successfully!",

    "success"

);
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

    showNotification(

        "Budget Alert",

        category + " budget exceeded.",

        "error"

    );

}

        budgetList.innerHTML+=`

        <div class="budget-card">

            <h3>${category}</h3>

            <p>

            ${currency}${spent.toFixed(2)}

            /

            ${currency}${budget.toFixed(2)}

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

    const goal = {

        id:Date.now(),

        name:goalNameInput.value,

        target:Number(goalAmountInput.value)

    };

    goals.push(goal);

    displayGoals();

    goalForm.reset();

}
/*==================================================
DISPLAY GOAL
==================================================*/
function displayGoals(){

    goalList.innerHTML="";

    let income=0;
    let expense=0;

    transactions.forEach(function(transaction){

        if(transaction.type==="Income"){

            income+=transaction.amount;

        }else{

            expense+=transaction.amount;

        }

    });

    const savings=income-expense;

    goals.forEach(function(goal){

        const percent=Math.min(
            savings/goal.target*100,
            100
        );

        if(percent >= 100){

    showNotification(

        "Congratulations!",

        goal.name + " completed.",

        "success"

    );

}
        goalList.innerHTML+=`

        <div class="goal-item">

            <h3>${goal.name}</h3>

            <p>

                ${currency}${savings.toFixed(2)}

                /

                ₹${goal.target.toFixed(2)}

            </p>

            <div class="progress-bar">

                <div
                class="progress"

                style="width:${percent}%">

                </div>

            </div>

            <p>

                ${percent.toFixed(1)}%

            </p>

            <button

            onclick="deleteGoal(${goal.id})">

            Delete

            </button>

        </div>

        `;

    });

}

function deleteGoal(id){

    goals = goals.filter(function(goal){

        return goal.id !== id;

    });

    displayGoals();

}

/*==================================================
EXPORT CSV
==================================================*/

function exportCSV(){

    if(transactions.length === 0){

        showToast(

    "No transactions available.",

    "error"

);

        return;

    }

    showLoader();

    let csv =

    "Title,Category,Type,Amount,Date,Recurring\n";

    transactions.forEach(function(transaction){

        csv +=

        `${transaction.title},` +

        `${transaction.category},` +

        `${transaction.type},` +

        `${transaction.amount},` +

        `${transaction.date},${transaction.recurring}\n`;

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

setTimeout(function(){

    hideLoader();

    showToast(
        "CSV exported successfully!",
        "success"
    );

},1000);
}

/*==================================================
EXPORT PDF
==================================================*/

function exportPDF(){

    if(transactions.length === 0){
showToast(

    "No transactions available.",

    "error"

);
        return;

    }

    showLoader();

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
    doc.text("Recurring", 230, y);
    y += 10;

    let income = 0;
    let expense = 0;

    transactions.forEach(function(transaction){

        doc.text(transaction.title, 20, y);
        doc.text(transaction.category, 60, y);
        doc.text(transaction.type, 110, y);
        doc.text(`${currency}${transaction.amount}`,150,y);
        doc.text(transaction.date, 180, y);
        doc.text(transaction.recurring, 230, y);

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

    doc.text(`Income : ${currency}${income.toFixed(2)}`,20,y);

    y += 10;

    doc.text(`Expense : ${currency}${expense.toFixed(2)}`,20,y);

    y += 10;

    doc.text(`Balance : ${currency}${balance.toFixed(2)}`,20,y);

    doc.save("FinTrack-Report.pdf");

setTimeout(function(){

    hideLoader();

    showToast(
        "PDF exported successfully!",
        "success"
    );

},1000);
}
/*==========================================================
NOTIFICATION SYSTEM
==========================================================*/

function showNotification(title, message, type = "info"){

    const notification = document.createElement("div");

    notification.className =
    `notification ${type}`;

    notification.innerHTML = `

        <h4>${title}</h4>

        <p>${message}</p>

    `;

    notificationContainer.appendChild(notification);

    setTimeout(function(){

        notification.remove();

    },3000);

}

/*==========================================================
GENERATE RECURRING TRANSACTIONS
==========================================================*/

function generateRecurringTransactions(){

    const today = new Date();

    const currentMonth = today.getMonth();

    const currentYear = today.getFullYear();

    transactions.forEach(function(transaction){

        if(transaction.recurring !== "Monthly"){

            return;

        }

        const transactionDate = new Date(transaction.date);

        const alreadyExists = transactions.some(function(item){

            return (

                item.title === transaction.title &&

                new Date(item.date).getMonth() === currentMonth &&

                new Date(item.date).getFullYear() === currentYear

            );

        });

        if(!alreadyExists){

            const newTransaction = {

                ...transaction,

                id: Date.now() + Math.random(),

                date: today.toISOString().split("T")[0]

            };

            transactions.push(newTransaction);

        }

    });

    saveTransactions();

}
/*==========================================================
SMART INSIGHTS
==========================================================*/

function updateInsights(){

    insightsContainer.innerHTML = "";

    if(transactions.length === 0){

        insightsContainer.innerHTML = `

        <div class="insight-card">

            <h3>No Data</h3>

            <p>

                Add transactions to see financial insights.

            </p>

        </div>

        `;

        return;

    }

    let categoryTotals = {};

    let largestExpense = null;

    let totalExpense = 0;

    let expenseCount = 0;

    let income = 0;

    transactions.forEach(function(transaction){

        if(transaction.type === "Income"){

            income += transaction.amount;

        }

        if(transaction.type === "Expense"){

            totalExpense += transaction.amount;

            expenseCount++;

            if(

                !largestExpense ||

                transaction.amount >

                largestExpense.amount

            ){

                largestExpense = transaction;

            }

            if(!categoryTotals[transaction.category]){

                categoryTotals[transaction.category] = 0;

            }

            categoryTotals[transaction.category] += transaction.amount;

        }

    });

    let highestCategory = "";

    let highestAmount = 0;

    for(const category in categoryTotals){

        if(categoryTotals[category] > highestAmount){

            highestAmount = categoryTotals[category];

            highestCategory = category;

        }

    }

    const averageExpense =

    expenseCount === 0

    ? 0

    : totalExpense / expenseCount;

    const savings = income - totalExpense;

    const savingsRate =

    income === 0

    ? 0

    : (savings / income) * 100;

    let recommendation =

    "Great job managing your finances.";

    if(savingsRate < 20){

        recommendation =

        "Try saving at least 20% of your income.";

    }

    if(highestCategory){

        recommendation +=

        "<br><br>Highest spending category: <strong>" +

        highestCategory +

        "</strong>";

    }

    insightsContainer.innerHTML = `

    <div class="insight-card">

        <h3>Highest Spending Category</h3>

        <p>${highestCategory || "N/A"}</p>

    </div>

    <div class="insight-card">

        <h3>Largest Expense</h3>

        <p>

        ${largestExpense ?

        largestExpense.title +

        " (" +
currency +
largestExpense.amount.toFixed(2) +
")"

        : "N/A"}

        </p>

    </div>

    <div class="insight-card">

        <h3>Average Expense</h3>

        <p>

        ${currency}${averageExpense.toFixed(2)}

        </p>

    </div>

    <div class="insight-card">

        <h3>Savings Rate</h3>

        <p>

        ${savingsRate.toFixed(1)}%

        </p>

    </div>

    <div class="insight-card">

        <h3>Recommendation</h3>

        <p>

        ${recommendation}

        </p>

    </div>

    `;

}
/*==========================================================
INITIALIZE
==========================================================*/

loadTransactions();
generateRecurringTransactions();

filterTransactions();

updateDashboard();
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
/*==========================================================
LOADING FUNCTIONS
==========================================================*/

function showLoader(){

    loadingOverlay.style.display =
    "flex";

}

function hideLoader(){

    loadingOverlay.style.display =
    "none";

}

showLoader();

setTimeout(function(){

    hideLoader();

},3000);