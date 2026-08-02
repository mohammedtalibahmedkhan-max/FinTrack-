/*
====================================================
REPORT SERVICE
====================================================
Creates financial reports.
====================================================
*/

const ReportService = {

    generate(finance){

        return {

            income:finance.income,

            expense:finance.expense,

            balance:finance.balance,

            savings:finance.savings,

            savingsRate:finance.savingsRate,

            healthScore:finance.healthScore,

            cashFlow:finance.cashFlow,

            highestCategory:finance.highestCategory,

            highestExpense:finance.highestExpense,

            highestIncome:finance.highestIncome,

            totalTransactions:finance.totalTransactions,

            topCategory:finance.topCategory,

            dailyExpense:finance.dailyExpense,

            bestMonth:finance.bestMonth,

            expenseGrowth:finance.expenseGrowth

        };

    }

};