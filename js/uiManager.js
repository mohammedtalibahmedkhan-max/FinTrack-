/*
=========================================
UI MANAGER
Central place to refresh the interface.
=========================================
*/

const UI = {

    refresh(){

        updateDashboardCards();

        updateExpenseChart();

        updateIncomeExpenseChart();

        updateMonthlyExpenseChart();

        updateAnalytics();

        displayBudgets();

        displayGoals();

        updateInsights();

    }

};