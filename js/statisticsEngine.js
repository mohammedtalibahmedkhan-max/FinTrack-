/*
====================================================
Statistics Engine

Responsible for:

• Largest Expense
• Highest Category
• Average Expense
• Savings Rate
• Recommendation
• Expense Percentages

====================================================
*/

function calculateStatistics(transactions, financeData){

    let largestExpense = null;

    const categoryTotals = {};

    transactions.forEach(function(transaction){

        if(transaction.type !== "Expense"){

            return;

        }

        if(

            largestExpense === null ||

            transaction.amount >

            largestExpense.amount

        ){

            largestExpense = transaction;

        }

        if(!categoryTotals[transaction.category]){

            categoryTotals[transaction.category] = 0;

        }

        categoryTotals[transaction.category] += transaction.amount;

    });

    let highestCategory = "";

    let highestAmount = 0;

    for(const category in categoryTotals){

        if(categoryTotals[category] > highestAmount){

            highestAmount = categoryTotals[category];

            highestCategory = category;

        }

    }

    const expenseTransactions =

    transactions.filter(function(transaction){

        return transaction.type === "Expense";

    });

    const averageExpense =

    expenseTransactions.length

    ?

    financeData.expense /

    expenseTransactions.length

    :

    0;

    let savingsRate = 0;

    if(financeData.income > 0){

        savingsRate =

        (

            financeData.balance /

            financeData.income

        ) * 100;

    }

    let recommendation =
    "Excellent financial management.";

    if(savingsRate < 20){

        recommendation =
        "Try saving at least 20% of your income.";

    }

    if(financeData.balance < 0){

        recommendation =
        "Your expenses exceed your income.";

    }

    return{

        largestExpense,

        highestCategory,

        highestAmount,

        averageExpense,

        savingsRate,

        recommendation,

        categoryTotals

    };

}