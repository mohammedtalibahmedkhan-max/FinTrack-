/*
====================================================
CHALLENGE SERVICE
====================================================
*/

const ChallengeService = {

    generate(finance){

        const challenges = [];

        //------------------------------------------------
        // Savings Rate Badge
        //------------------------------------------------

        if(finance.savingsRate >= 40){

            challenges.push({
                icon:"💎",
                title:"Platinum Saver",
                description:"Saved over 40% of your income."
            });

        }else if(finance.savingsRate >= 30){

            challenges.push({
                icon:"🥇",
                title:"Gold Saver",
                description:"Saved over 30% of your income."
            });

        }else if(finance.savingsRate >= 20){

            challenges.push({
                icon:"🥈",
                title:"Silver Saver",
                description:"Saved over 20% of your income."
            });

        }else if(finance.savingsRate >= 10){

            challenges.push({
                icon:"🥉",
                title:"Bronze Saver",
                description:"Saved over 10% of your income."
            });

        }

        //------------------------------------------------
        // Expense Challenge
        //------------------------------------------------

        if(finance.expense < finance.income){

            challenges.push({

                icon:"🎯",

                title:"Controlled Spending",

                description:"Expenses are below income."

            });

        }

        //------------------------------------------------
        // Budget Challenge
        //------------------------------------------------

        if(finance.healthScore >= 90){

            challenges.push({

                icon:"🏆",

                title:"Financial Discipline",

                description:"Outstanding financial health."

            });

        }

        //------------------------------------------------
        // Income Challenge
        //------------------------------------------------

        if(finance.highestIncome > 50000){

            challenges.push({

                icon:"💼",

                title:"High Earner",

                description:"Monthly income exceeded ₹50,000."

            });

        }

        //------------------------------------------------
        // Goal Challenge
        //------------------------------------------------

        if(finance.savings > 100000){

            challenges.push({

                icon:"🚀",

                title:"Future Millionaire",

                description:"Excellent savings progress."

            });

        }

        return challenges;

    }

};