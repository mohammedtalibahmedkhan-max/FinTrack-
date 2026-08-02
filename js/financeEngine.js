/*
==========================================================
FILE : financeEngine.js

PURPOSE

This file contains ONE function responsible for calculating
every financial statistic used by FinTrack.

The rest of the application should NEVER manually calculate
income, expense or analytics again.

Instead simply call

const finance = calculateFinanceData(transactions);

and use the returned object.

==========================================================
*/

function calculateFinanceData(transactions) {

    let income = 0;
    let expense = 0;

    let highestIncome = 0;
    let highestExpense = 0;

    let monthlyExpense = 0;

    let expenseCount = 0;
    let incomeCount = 0;

    let largestExpense = null;
    let largestIncome = null;

    const categoryTotals = {};
    const monthlyTotals = {};
    const categoryCount = {};

    

    const today = new Date();

    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    //--------------------------------------------------
    // SINGLE LOOP
    //--------------------------------------------------

    transactions.forEach(function(transaction){

        //--------------------------------------------------
        // Income
        //--------------------------------------------------

        if(transaction.type === "Income"){

            income += transaction.amount;

            incomeCount++;

            if(transaction.amount > highestIncome){

                highestIncome = transaction.amount;
                largestIncome = transaction;

            }

        }

        //--------------------------------------------------
        // Expense
        //--------------------------------------------------

        else{

            expense += transaction.amount;

            expenseCount++;

if(
    !largestExpense ||
    transaction.amount > largestExpense.amount
){

    largestExpense = transaction;

}


            if(transaction.amount > highestExpense){

                highestExpense = transaction.amount;
                largestExpense = transaction;

            }

            const date = new Date(transaction.date);

            const month = date.toLocaleString(

    "default",

    {

        month:"long"

    }

);

monthlyTotals[month] =

    (monthlyTotals[month] || 0)

    +

    transaction.amount;
            if(
                date.getMonth() === currentMonth &&
                date.getFullYear() === currentYear
            ){

                monthlyExpense += transaction.amount;

            }

        }

        //--------------------------------------------------
        // Category Totals
        //--------------------------------------------------

        categoryTotals[transaction.category] =
            (categoryTotals[transaction.category] || 0)
            + transaction.amount;

        //--------------------------------------------------
        // Category Count
        //--------------------------------------------------

        categoryCount[transaction.category] =
            (categoryCount[transaction.category] || 0)
            + 1;


    });

    //--------------------------------------------------
    // Top Category
    //--------------------------------------------------

    let topCategory = "";

    let maxCount = 0;

    for(const category in categoryCount){

        if(categoryCount[category] > maxCount){

            maxCount = categoryCount[category];

            topCategory = category;

        }

    }

    //--------------------------------------------------
    // Highest Spending Category
    //--------------------------------------------------

    let highestCategory = "";

    let highestCategoryAmount = 0;

    for(const category in categoryTotals){

        if(categoryTotals[category] > highestCategoryAmount){

            highestCategoryAmount =
                categoryTotals[category];

            highestCategory =
                category;

        }

    }

    //--------------------------------------------------
    // Balance
    //--------------------------------------------------

    const balance = income - expense;

    //--------------------------------------------------
    // Savings
    //--------------------------------------------------

    const savings = balance;

    //--------------------------------------------------
    // Savings Rate
    //--------------------------------------------------

    const savingsRate =
        income > 0
        ? (savings / income) * 100
        : 0;

    //--------------------------------------------------
    // Average Transaction
    //--------------------------------------------------

    const averageTransaction =
        transactions.length
        ? (income + expense) / transactions.length
        : 0;

    //--------------------------------------------------
    // Average Expense
    //--------------------------------------------------

    const averageExpense =
        expenseCount
        ? expense / expenseCount
        : 0;

    //--------------------------------------------------
    // Average Income
    //--------------------------------------------------

    const averageIncome =
        incomeCount
        ? income / incomeCount
        : 0;

  /*==================================================
RECOMMENDATION
==================================================*/

let recommendation = "";

if(income === 0){

    recommendation =
    "Add income transactions.";

}
else if(savingsRate < 20){

    recommendation =
    "Try saving at least 20% of your income.";

}
else{

    recommendation =
    "Great job managing your finances.";

}

/*==================================================
INCOME VS EXPENSE DATA
==================================================*/

const incomeExpenseData = {

    labels:[
        "Income",
        "Expense"
    ],

    values:[
        income,
        expense
    ]

};
/*==================================================
EXPENSE CATEGORY DATA
==================================================*/

const expenseCategoryData = {

    labels:
    Object.keys(categoryTotals),

    values:
    Object.values(categoryTotals)

};

/*==================================================
FINANCIAL HEALTH SCORE
==================================================*/

const expenseRatio =
income > 0
? (expense / income) * 100
: 100;

let healthScore = 100;

if(expenseRatio > 90){

    healthScore -= 40;

}
else if(expenseRatio > 70){

    healthScore -= 20;

}

if(savingsRate < 20){

    healthScore -= 20;

}

if(expenseCount > incomeCount * 3){

    healthScore -= 10;

}

healthScore = Math.max(0, Math.min(100, healthScore));

const cashFlow = income - expense;
const averageDailyExpense =
monthlyExpense / Math.max(new Date().getDate(),1);

let highestMonth = "";
let highestMonthAmount = 0;

for(const month in monthlyTotals){

    if(monthlyTotals[month] > highestMonthAmount){

        highestMonthAmount =
        monthlyTotals[month];

        highestMonth = month;

    }

}

let lowestMonth = "";
let lowestMonthAmount = Infinity;

for(const month in monthlyTotals){

    if(monthlyTotals[month] < lowestMonthAmount){

        lowestMonthAmount =
        monthlyTotals[month];

        lowestMonth = month;

    }

}

/*==================================================
FINANCIAL HEALTH
==================================================*/


if(income === 0){

    healthScore = 0;

}else{

    const ratio = expense / income;

    healthScore = Math.max(

        0,

        Math.min(

            100,

            Math.round((1 - ratio) * 100)

        )

    );

}

/*==================================================
DAILY EXPENSE
==================================================*/

const uniqueDays = new Set();

transactions.forEach(function(transaction){

    if(transaction.type === "Expense"){

        uniqueDays.add(transaction.date);

    }

});

    return {

    income,

    expense,

    balance,

    savings,

    highestIncome,

    highestExpense,

    monthlyExpense,

    averageTransaction,

    totalTransactions: transactions.length,

    topCategory,

    highestCategory,

    categoryTotals,

    monthlyTotals,

    expenseCount,

    largestExpense,

    largestIncome,

    averageExpense,

    averageIncome,

    savingsRate,

    recommendation,

    incomeExpenseData,

    expenseCategoryData,

    healthScore,

    cashFlow,

    averageDailyExpense,

    highestMonth,

    highestMonthAmount,

    lowestMonth,

    lowestMonthAmount

};

}