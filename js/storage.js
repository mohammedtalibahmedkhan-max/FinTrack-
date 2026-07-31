/*
===========================================
STORAGE SERVICE
===========================================
*/

const Storage = {

    /*=========================
    TRANSACTIONS
    =========================*/

    saveTransactions(transactions){

        localStorage.setItem(
            "transactions",
            JSON.stringify(transactions)
        );

    },

    getTransactions(){

        return JSON.parse(

            localStorage.getItem("transactions")

        ) || [];

    },

    /*=========================
    BUDGETS
    =========================*/

    saveBudgets(budgets){

        localStorage.setItem(

            "budgets",

            JSON.stringify(budgets)

        );

    },

    getBudgets(){

        return JSON.parse(

            localStorage.getItem("budgets")

        ) || {};

    },

    /*=========================
    GOALS
    =========================*/

    saveGoals(goals){

        localStorage.setItem(

            "goals",

            JSON.stringify(goals)

        );

    },

    getGoals(){

        return JSON.parse(

            localStorage.getItem("goals")

        ) || [];

    },

    /*=========================
    SETTINGS
    =========================*/

    saveSettings(settings){

        localStorage.setItem(

            "settings",

            JSON.stringify(settings)

        );

    },

    getSettings(){

        return JSON.parse(

            localStorage.getItem("settings")

        ) || {};

    }

};