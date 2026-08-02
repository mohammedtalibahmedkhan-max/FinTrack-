/*
====================================================
FORECAST SERVICE
====================================================
Predicts future financial trends.
====================================================
*/

const ForecastService = {

    generate(finance){

        const forecast = {

            nextMonthExpense:0,

            nextMonthIncome:0,

            expectedSavings:0,

            trend:"Stable"

        };

        //------------------------------------------------
        // Average Monthly Expense
        //------------------------------------------------

        const monthlyExpenses =
        Object.values(finance.monthlyTotals);

        if(monthlyExpenses.length){

            const total =
            monthlyExpenses.reduce(function(sum,value){

                return sum + value;

            },0);

            forecast.nextMonthExpense =
            total / monthlyExpenses.length;

        }

        //------------------------------------------------
        // Income
        //------------------------------------------------

        forecast.nextMonthIncome =
        finance.income;

        //------------------------------------------------
        // Savings
        //------------------------------------------------

        forecast.expectedSavings =
        forecast.nextMonthIncome -
        forecast.nextMonthExpense;

        //------------------------------------------------
        // Trend
        //------------------------------------------------

        if(forecast.expectedSavings > 0){

            forecast.trend = "Positive";

        }

        if(forecast.expectedSavings < 0){

            forecast.trend = "Negative";

        }

        return forecast;

    }

};