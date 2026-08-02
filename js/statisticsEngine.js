/*
====================================================
STATISTICS ENGINE
====================================================

Responsible for advanced financial statistics.

Never touches the UI.

Only returns calculated data.

====================================================
*/

const StatisticsEngine = {

    calculate(report){

        const stats = {};

        stats.healthScore =
            this.calculateHealth(report);

        stats.cashFlow =
            report.income - report.expense;

        stats.dailyExpense =
            this.calculateDailyExpense(report);

        stats.highestMonth =
            this.getHighestMonth(report);

        return stats;

    },

    calculateHealth(report){

        if(report.income === 0){

            return 0;

        }

        const savingsRate =
            (report.balance / report.income) * 100;

        let score = 50;

        score += savingsRate;

        if(report.expense > report.income){

            score -= 25;

        }

        if(score > 100){

            score = 100;

        }

        if(score < 0){

            score = 0;

        }

        return Math.round(score);

    },

    calculateDailyExpense(report){

        const today = new Date();

        const days =
            new Date(
                today.getFullYear(),
                today.getMonth()+1,
                0
            ).getDate();

        return report.monthlyExpense / days;

    },

    getHighestMonth(report){

        let month = "-";

        let amount = 0;

        for(const key in report.monthlyTotals){

            if(report.monthlyTotals[key] > amount){

                amount = report.monthlyTotals[key];

                month = key;

            }

        }

        return month;

    }

};