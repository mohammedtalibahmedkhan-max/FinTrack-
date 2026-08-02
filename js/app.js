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
const billForm =
document.getElementById("bill-form");

const billTitleInput =
document.getElementById("bill-title");

const billAmountInput =
document.getElementById("bill-amount");

const billDateInput =
document.getElementById("bill-date");

const billList =
document.getElementById("bill-list");
// Dashboard Cards
const balanceElement =
document.getElementById("balance");

const incomeElement =
document.getElementById("income");

const expenseElement =
document.getElementById("expense");

const healthScoreElement =
document.getElementById("health-score");

const cashFlowElement =
document.getElementById("cash-flow");

const dailyExpenseElement =
document.getElementById("daily-expense");

const highestMonthElement =
document.getElementById("highest-month");

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

const forecastContainer =
document.getElementById(
    "forecast-container"
);

const challengeContainer =
document.getElementById("challenge-container");

const aiAdvisorContainer =
document.getElementById("ai-advisor-container");
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

const bestMonthElement =
document.getElementById("best-month");


const worstMonthElement =
document.getElementById("worst-month");


const expenseGrowthElement =
document.getElementById("expense-growth");

const currencySelect =
document.getElementById(
    "currency-select"
);

const reportContainer =
document.getElementById("report-container");



const subscriptionForm =
document.getElementById("subscription-form");

const subscriptionName =
document.getElementById("subscription-name");

const subscriptionAmount =
document.getElementById("subscription-amount");

const subscriptionDate =
document.getElementById("subscription-date");

const subscriptionFrequency =
document.getElementById("subscription-frequency");

const subscriptionList =
document.getElementById("subscription-list");

const billReminderContainer =
document.getElementById(
    "bill-reminder-container"
);

const billRecurringInput =
document.getElementById(
    "bill-recurring"
);

const calendarGrid =
document.getElementById(
"calendar-grid"
);

const calendarTitle =
document.getElementById(
"calendar-title"
);

const dayEvents =
document.getElementById(
"day-events"
);

const previousMonthButton =
document.getElementById(
"prev-month"
);

const nextMonthButton =
document.getElementById(
"next-month"
);
const currency =
SettingsService.getCurrency();
/*==========================================================
APPLICATION DATA
==========================================================*/

let transactions = [];
let financeData = {};
/*==========================================================
CHART OBJECTS
==========================================================*/
let expenseChart = null;

let incomeExpenseChart = null;

let monthlyExpenseChart = null;


/*==========================================================
BUDGET DATA
==========================================================*/

let budgets = Storage.getBudgets();
let goals = GoalService.getAll();
let bills =
BillService.getAll();
let subscriptions =
SubscriptionService.getAll();

let calendarDate =
new Date();
/*==========================================================
CENTRAL FINANCIAL REPORT
Stores all calculated values.
==========================================================*/

let financialReport = {};

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
billForm.addEventListener(

    "submit",

    saveBill

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

currencySelect.addEventListener(

    "change",

    function(){

        SettingsService.setCurrency(

            currencySelect.value

        );

        EventBus.emit(

            "transactionsChanged"

        );

    }

);

subscriptionForm.addEventListener(

    "submit",

    saveSubscription

);

window.location="login.html";

});
/*==========================================================
ADD TRANSACTION
==========================================================*/

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


    const validation = ValidationService.validateTransaction({

    title,

    amount,

    category,

    type,

    date

});

if(!validation.valid){

    hideLoader();

    showToast(validation.message,"error");

    return;

}

    const isEditing =
    editingTransactionId !== null;




    try{

    if(isEditing){

        const transaction = {

            id: editingTransactionId,

            title,

            amount,

            category,

            type,

            date,

            recurring

        };

        transactions =
        TransactionService.update(transaction);

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

        transactions =
        TransactionService.add(transaction);

    }
    }catch(error){

    hideLoader();

    showToast(

        error.message,

        "error"

    );

    return;

}

    /*
    ------------------------------------
    Save latest data
    ------------------------------------
    */

    Storage.saveTransactions(
        transactions
    );

    /*
    ------------------------------------
    Notify entire application
    ------------------------------------
    */

    EventBus.emit(
        "transactionsChanged"
    );

    /*
    ------------------------------------
    Reset form
    ------------------------------------
    */

    transactionForm.reset();

    /*
    ------------------------------------
    Success Notification
    ------------------------------------
    */

    setTimeout(function(){

        hideLoader();

        showNotification(

            "Success",

            isEditing
            ? "Transaction updated successfully."
            : "Transaction added successfully.",

            "success"

        );

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

           <td>${Formatter.currency(transaction.amount, currency)}</td>

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
UPDATE DASHBOARD CARDS
==========================================================*/

function updateDashboardCards(){

    const currency = SettingsService.getCurrency();
    /*
    ------------------------------------
    Calculate financial data ONCE
    ------------------------------------
    */

    financialReport =
    calculateFinanceData(transactions);

    /*
    ------------------------------------
    Short Alias
    ------------------------------------
    */

    const finance = financialReport;


    const stats =
StatisticsEngine.calculate(finance);


    /*
    ------------------------------------
    Dashboard Cards
    ------------------------------------
    */
balanceElement.textContent =
Formatter.currency(finance.balance, currency);

incomeElement.textContent =
Formatter.currency(finance.income, currency);

expenseElement.textContent =
Formatter.currency(finance.expense, currency);

savingsElement.textContent =
Formatter.currency(finance.savings, currency);

healthScoreElement.textContent =
stats.healthScore + "%";

cashFlowElement.textContent =
Formatter.currency(
    stats.cashFlow,
    currency
);

dailyExpenseElement.textContent =
Formatter.currency(
    stats.dailyExpense,
    currency
);

highestMonthElement.textContent =
stats.highestMonth;
    /*
    ------------------------------------
    Refresh Components
    ------------------------------------
    */

  ChartService.updateExpenseChart();

ChartService.updateIncomeExpenseChart();

ChartService.updateMonthlyExpenseChart();

    displayBudgets();

    displayGoals();

    displayBills();

    CalendarRenderer.render();

checkDueBills();

    updateInsights();

    updateAIAdvisor();

    updateForecast();

    updateChallenges();

    updateFinancialReport();

   const analytics =
AnalyticsService.generate(
    financialReport
);


bestMonthElement.textContent =
analytics.bestMonth;


worstMonthElement.textContent =
analytics.worstMonth;


expenseGrowthElement.textContent =
analytics.expenseGrowth + "%";

}
/*==========================================================
LOCAL STORAGE
==========================================================*/

function saveTransactions(){

    TransactionService.saveAll(transactions);

}

function loadTransactions(){

    transactions = TransactionService.getAll();

    UI.refresh();

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

   transactions = TransactionService.delete(id);

    EventBus.emit("transactionsChanged");

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
TransactionService.getById(id);

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

function saveBudget(event){

    event.preventDefault();

    const category =
    budgetCategoryInput.value;

    const amount =
    Number(budgetAmountInput.value);

    const validation = ValidationService.validateBudget(

    category,

    amount

);

if(!validation.valid){

    showToast(validation.message,"error");

    return;

}

  budgets = BudgetService.add(

    category,

    amount

);

EventBus.emit(

    "transactionsChanged"

);

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

           ${Formatter.currency(spent, currency)}

            /

           ${Formatter.currency(budget, currency)}

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

            <button

onclick="deleteBudget('${category}')"

class="delete-btn">

Delete

</button>

        </div>

        `;

    }

}


function deleteBudget(category){

    budgets = BudgetService.delete(category);

    EventBus.emit(

        "transactionsChanged"

    );

    showToast(

        "Budget deleted.",

        "warning"

    );

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

    const validation = ValidationService.validateGoal(

    goalNameInput.value,

    Number(goalAmountInput.value)

);

if(!validation.valid){

    showToast(validation.message,"error");

    return;

}


    goals = GoalService.add(goal);

EventBus.emit("transactionsChanged");

goalForm.reset();

showToast(

    "Goal saved successfully!",

    "success"

);

}

/*====================================================
SAVE BILL
====================================================*/

function saveBill(event){

    event.preventDefault();

    const bill = {

    id: Date.now(),

    title: billTitleInput.value.trim(),

    amount: Number(billAmountInput.value),

    dueDate: billDateInput.value,

    paid:false,

    recurring:
billRecurringInput.checked,

    lastGenerated:

        new Date(billDateInput.value)

        .getMonth()

};
    bills = BillService.add(bill);

    displayBills();

    billForm.reset();

    showToast("Bill added successfully!","success");

}
/*====================================================
DISPLAY BILLS
====================================================*/

function displayBills(){

    billList.innerHTML="";

    if(bills.length===0){

        billList.innerHTML=

        "<p>No bills added.</p>";

        return;

    }

    const today =
    new Date();

    bills.forEach(function(bill){

        const due =
        new Date(bill.dueDate);

        let status="Upcoming";

        let color="info";

        if(bill.paid){

            status="Paid";

            color="success";

        }

        else if(due < today){

            status="Overdue";

            color="danger";

        }

        else if(

            due.toDateString()===

            today.toDateString()

        ){

            status="Due Today";

            color="warning";

        }

        billList.innerHTML += `

        <div class="bill-card">

            <h3>${bill.title}</h3>

            ${
bill.recurring
?
"<span class='badge'>Monthly</span>"
:
""
}

            <p>Amount :
            ${currency}${bill.amount}</p>

            <p>Due :
            ${bill.dueDate}</p>

            <p class="${color}">

                ${status}

            </p>

            <button

                onclick="markBillPaid(${bill.id})">

                Mark Paid

            </button>

            <button

                onclick="deleteBill(${bill.id})">

                Delete

            </button>

        </div>

        `;

    });

}


/*====================================================
SHOW EVENTS OF SELECTED DAY
====================================================*/

function showDayEvents(date){

    dayEvents.innerHTML = "";

    const events =

    CalendarService.getEvents(

        transactions,

        bills,

        subscriptions

    );

    let found = false;

    events.forEach(function(event){

        if(event.date === date){

            found = true;

            dayEvents.innerHTML += `

            <div class="timeline-card">

                <h3>${event.title}</h3>

                <p>${event.type}</p>

                <small>${event.date}</small>

            </div>

            `;

        }

    });

    if(!found){

        dayEvents.innerHTML =

        "<p>No events for this day.</p>";

    }

}
/*====================================================
DELETE BILL
====================================================*/

function deleteBill(id){

    bills = BillService.remove(id);

    displayBills();

    showToast(

        "Bill deleted.",

        "warning"

    );

}


/*====================================================
MARK BILL PAID
====================================================*/

function markBillPaid(id){

    bills = BillService.markPaid(id);

    displayBills();

    showToast(

        "Bill marked as paid.",

        "success"

    );

}

/*====================================================
CHECK DUE BILLS
====================================================*/

function checkDueBills(){

    const today =
    new Date();

    bills.forEach(function(bill){

        if(bill.paid){

            return;

        }

        const due =
        new Date(bill.dueDate);

        const diff =

        Math.ceil(

            (due - today)

            /

            (1000*60*60*24)

        );

        if(diff===0){

            showNotification(

                "Bill Reminder",

                bill.title +

                " is due today.",

                "warning"

            );

        }

        if(diff<0){

            showNotification(

                "Overdue",

                bill.title +

                " payment overdue.",

                "error"

            );

        }

    });

}

/*====================================================
AUTO GENERATE MONTHLY BILLS
====================================================*/

function generateRecurringBills(){

    const today = new Date();

    const month = today.getMonth();

    bills.forEach(function(bill){

        if(!bill.recurring){

            return;

        }

        if(bill.lastGenerated === month){

            return;

        }

        const nextBill = {

            ...bill,

            id: Date.now() + Math.random(),

            paid:false,

            dueDate:
                today.toISOString().split("T")[0],

            lastGenerated:month

        };

        bills.push(nextBill);

    });

    BillService.saveAll(bills);

}


/*==================================================
DISPLAY GOAL
==================================================*/
function displayGoals(){
 
    goals = GoalService.getAll();
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

               ${Formatter.currency(savings, currency)}

                /

               ${Formatter.currency(goal.target, currency)}

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

    goals = GoalService.delete(id);

    EventBus.emit(

        "transactionsChanged"

    );

    showToast(

        "Goal deleted successfully!",

        "warning"

    );

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
        doc.text(
    Formatter.currency(
        transaction.amount,
        currency
    ),
    150,
    y
);
        doc.text(transaction.date, 180, y);
       doc.text(String(transaction.recurring),230,y);

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

   doc.text(
    `Income : ${Formatter.currency(income,currency)}`,
    20,
    y
);

    y += 10;

   doc.text(
    `Expense : ${Formatter.currency(expense,currency)}`,
    20,
    y
);

    y += 10;

   doc.text(
    `Balance : ${Formatter.currency(balance,currency)}`,
    20,
    y
);

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

    Storage.saveTransactions(transactions);

EventBus.emit("transactionsChanged");

}
/*==========================================================
SMART INSIGHTS
==========================================================*/

function updateInsights(){

    insightsContainer.innerHTML = "";

    if(financialReport.totalTransactions === 0){

        insightsContainer.innerHTML = `

        <div class="insight-card">

            <h3>No Data</h3>

            <p>Add transactions to see financial insights.</p>

        </div>

        `;

        return;

    }

    let recommendation =
    financialReport.recommendation;

    if(financialReport.topCategory){

        recommendation +=

        "<br><br>Highest spending category: <strong>" +

        financialReport.topCategory +

        "</strong>";

    }

    insightsContainer.innerHTML = `

    <div class="insight-card">

        <h3>Highest Spending Category</h3>

        <p>${financialReport.topCategory || "N/A"}</p>

    </div>

    <div class="insight-card">

        <h3>Largest Expense</h3>

        <p>

        ${
            financialReport.largestExpense
            ? financialReport.largestExpense.title +
              " (" +
              currency +
              financialReport.largestExpense.amount.toFixed(2) +
              ")"
            : "N/A"
        }

        </p>

    </div>

    <div class="insight-card">

        <h3>Average Expense</h3>

        <p>

        ${currency}${financialReport.averageExpense.toFixed(2)}

        </p>

    </div>

    <div class="insight-card">

        <h3>Savings Rate</h3>

        <p>

        ${financialReport.savingsRate.toFixed(1)}%

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

function updateAIAdvisor(){

    const advice =
    AIAdvisorService.generate(financialReport);

    aiAdvisorContainer.innerHTML = "";

    advice.forEach(function(item){

        aiAdvisorContainer.innerHTML += `

        <div class="advisor-card ${item.type}">

            <h3>${item.title}</h3>

            <p>${item.message}</p>

        </div>

        `;

    });

}


function updateForecast(){

    const forecast =
    ForecastService.generate(
        financialReport
    );

    forecastContainer.innerHTML = `

    <div class="forecast-card">

        <h3>Next Month Expense</h3>

        <h2>

        ${Formatter.currency(
            forecast.nextMonthExpense,
            SettingsService.getCurrency()
        )}

        </h2>

    </div>

    <div class="forecast-card">

        <h3>Expected Savings</h3>

        <h2>

        ${Formatter.currency(
            forecast.expectedSavings,
            SettingsService.getCurrency()
        )}

        </h2>

    </div>

    <div class="forecast-card">

        <h3>Financial Trend</h3>

        <h2>

        ${forecast.trend}

        </h2>

    </div>

    `;

}

/*====================================================
UPDATE CHALLENGES
====================================================*/

function updateChallenges(){

    const badges =
    ChallengeService.generate(financialReport);

    challengeContainer.innerHTML = "";

    if(badges.length===0){

        challengeContainer.innerHTML = `

        <div class="challenge-card">

            <h3>

                🎯 No Achievements Yet

            </h3>

            <p>

                Keep improving your finances to unlock badges.

            </p>

        </div>

        `;

        return;

    }

    badges.forEach(function(badge){

        challengeContainer.innerHTML += `

        <div class="challenge-card">

            <h1>

                ${badge.icon}

            </h1>

            <h3>

                ${badge.title}

            </h3>

            <p>

                ${badge.description}

            </p>

        </div>

        `;

    });

}

function updateFinancialReport(){

    const report =
    ReportService.generate(financialReport);

    reportContainer.innerHTML = `

    <div class="report-card">

        <h3>Total Income</h3>

        <h2>

        ${Formatter.currency(report.income, SettingsService.getCurrency())}

        </h2>

    </div>

    <div class="report-card">

        <h3>Total Expense</h3>

        <h2>

        ${Formatter.currency(report.expense, SettingsService.getCurrency())}

        </h2>

    </div>

    <div class="report-card">

        <h3>Balance</h3>

        <h2>

        ${Formatter.currency(report.balance, SettingsService.getCurrency())}

        </h2>

    </div>

    <div class="report-card">

        <h3>Savings Rate</h3>

        <h2>

        ${report.savingsRate.toFixed(1)}%

        </h2>

    </div>

    <div class="report-card">

        <h3>Health Score</h3>

        <h2>

        ${report.healthScore}

        </h2>

    </div>

    <div class="report-card">

        <h3>Cash Flow</h3>

        <h2>

        ${Formatter.currency(report.cashFlow, SettingsService.getCurrency())}

        </h2>

    </div>

    <div class="report-card">

        <h3>Total Transactions</h3>

        <h2>

        ${report.totalTransactions}

        </h2>

    </div>

    <div class="report-card">

        <h3>Top Category</h3>

        <h2>

        ${report.topCategory}

        </h2>

    </div>

    `;

}


function saveSubscription(event){

    event.preventDefault();

    const subscription = {

        id:Date.now(),

        name:
        subscriptionName.value,

        amount:
        Number(subscriptionAmount.value),

        dueDate:
        subscriptionDate.value,

        frequency:
        subscriptionFrequency.value

    };

    subscriptions =
    SubscriptionService.add(subscription);

    displaySubscriptions();

    subscriptionForm.reset();

    showToast(

        "Subscription Added",

        "success"

    );

}

function displaySubscriptions(){

    subscriptionList.innerHTML="";

    subscriptions.forEach(function(item){

        subscriptionList.innerHTML += `

        <div class="subscription-card">

            <h3>${item.name}</h3>

            <p>

            ${Formatter.currency(
                item.amount,
                SettingsService.getCurrency()
            )}

            </p>

            <p>

            Due :

            ${item.dueDate}

            </p>

            <p>

            ${item.frequency}

            </p>

            <button

            onclick="deleteSubscription(${item.id})">

            Delete

            </button>

        </div>

        `;

    });

    updateBillReminders();

}

function updateBillReminders(){

    const today = new Date();

    billReminderContainer.innerHTML = "";

    subscriptions.forEach(function(item){

        const due = new Date(item.dueDate);

        const difference =

        Math.ceil(

            (due - today)

            /

            (1000*60*60*24)

        );

        let status = "";
        let css = "";

        if(difference < 0){

            status = "Overdue";

            css = "danger";

        }

        else if(difference === 0){

            status = "Due Today";

            css = "warning";

        }

        else if(difference <= 7){

            status =

            "Due in " +

            difference +

            " day(s)";

            css = "info";

        }

        else{

            status =

            "Upcoming";

            css = "success";

        }

        billReminderContainer.innerHTML += `

        <div class="reminder-card ${css}">

            <h3>${item.name}</h3>

            <p>

            ${Formatter.currency(

                item.amount,

                SettingsService.getCurrency()

            )}

            </p>

            <p>${status}</p>

            <button

            onclick="paySubscription(${item.id})">

            Mark Paid

            </button>

        </div>

        `;

    });

}

function paySubscription(id){

    subscriptions =

    SubscriptionService.markPaid(id);

    updateBillReminders();

    showToast(

        "Subscription marked as paid.",

        "success"

    );

}

function deleteSubscription(id){

    subscriptions =
    SubscriptionService.delete(id);

    displaySubscriptions();

}
/*
====================================================
APPLICATION EVENTS
====================================================
*/

EventBus.on(

    "transactionsChanged",

    function(){

        UI.refresh();

    }

);

/*====================================================
CALENDAR NAVIGATION
====================================================*/

previousMonthButton.onclick = function(){

    calendarDate.setMonth(

        calendarDate.getMonth() - 1

    );

    CalendarRenderer.render();

};

nextMonthButton.onclick = function(){

    calendarDate.setMonth(

        calendarDate.getMonth() + 1

    );

    CalendarRenderer.render();

};
/*==========================================================
INITIALIZE
==========================================================*/

loadTransactions();
displaySubscriptions();
displayBills();
generateRecurringBills();
checkDueBills();
generateRecurringTransactions();
UI.refresh();
CalendarRenderer.render();
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