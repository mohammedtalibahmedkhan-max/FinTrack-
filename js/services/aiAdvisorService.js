/*
====================================================
AI ADVISOR SERVICE
====================================================
*/

const AIAdvisorService = {

    generate(finance){

        const advice = [];

        //------------------------------------------------
        // Savings
        //------------------------------------------------

        if(finance.savingsRate < 10){

            advice.push({
                type:"danger",
                title:"Low Savings",
                message:"Your savings rate is below 10%. Reduce unnecessary expenses."
            });

        }else if(finance.savingsRate < 20){

            advice.push({
                type:"warning",
                title:"Average Savings",
                message:"Try saving at least 20% of your income."
            });

        }else{

            advice.push({
                type:"success",
                title:"Excellent",
                message:"Your savings rate is healthy."
            });

        }

        //------------------------------------------------
        // Expense
        //------------------------------------------------

        if(finance.expense > finance.income){

            advice.push({

                type:"danger",

                title:"Overspending",

                message:"Expenses exceed income."

            });

        }

        //------------------------------------------------
        // Largest Expense
        //------------------------------------------------

        if(finance.largestExpense){

            advice.push({

                type:"info",

                title:"Largest Expense",

                message:
                    finance.largestExpense.title +
                    " (" +
                    finance.largestExpense.amount +
                    ")"

            });

        }

        //------------------------------------------------
        // Highest Spending Category
        //------------------------------------------------

        advice.push({

            type:"info",

            title:"Top Spending Category",

            message:
                finance.highestCategory ||
                "No expenses"

        });

        //------------------------------------------------
        // Health Score
        //------------------------------------------------

        if(finance.healthScore >= 90){

            advice.push({

                type:"success",

                title:"Financial Health",

                message:"Excellent financial health."

            });

        }else if(finance.healthScore >= 70){

            advice.push({

                type:"warning",

                title:"Financial Health",

                message:"Good, but can improve."

            });

        }else{

            advice.push({

                type:"danger",

                title:"Financial Health",

                message:"Needs improvement."

            });

        }

        return advice;

    }

};