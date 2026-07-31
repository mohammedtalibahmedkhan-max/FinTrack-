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

        //--------------------------------------------------
        // Monthly Totals
        //--------------------------------------------------

        const monthName =
            new Date(transaction.date)
            .toLocaleString(
                "default",
                {
                    month:"short"
                }
            );

        monthlyTotals[monthName] =
            (monthlyTotals[monthName] || 0)
            + transaction.amount;

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

    //--------------------------------------------------
    // Return EVERYTHING
    //--------------------------------------------------
/*==================================================
MONTHLY EXPENSE TOTALS
==================================================*/

const monthlyExpenseTotals = {};

transactions.forEach(function(transaction){

    if(transaction.type !== "Expense"){

        return;

    }

    const month =
    new Date(transaction.date)
    .toLocaleString("default",{
        month:"long"
    });

    monthlyExpenseTotals[month] =
    (monthlyExpenseTotals[month] || 0)
    + transaction.amount;

});
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
    return{

    income,

    expense,

    balance: income-expense,

    savings: income-expense,

    highestIncome,

    highestExpense,

    monthlyExpense,

    averageTransaction:

        transactions.length

        ?

        (income+expense)/transactions.length

        :

        0,

    totalTransactions:

        transactions.length,

    topCategory,

    categoryTotals,

    monthlyTotals,

    expenseCount,

    largestExpense,

    averageExpense:

        expenseCount

        ?

        expense/expenseCount

        :

        0,

    savingsRate:

        income

        ?

        ((income-expense)/income)*100

        :

        0,

    recommendation:

        income===0

        ?

        "Add income transactions."

        :

        ((income-expense)/income)*100<20

        ?

        "Try saving at least 20% of your income."

        :

        "Great job managing your finances."

};

}