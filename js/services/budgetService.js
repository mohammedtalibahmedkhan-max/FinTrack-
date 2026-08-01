/*
====================================================
BUDGET SERVICE
====================================================

Responsible for

✓ Save Budget
✓ Delete Budget
✓ Load Budgets

====================================================
*/

const BudgetService = {

    getAll(){

        return Storage.getBudgets();

    },

    saveAll(budgets){

        Storage.saveBudgets(budgets);

    },

    add(category, amount){

        const budgets = this.getAll();

        budgets[category] = amount;

        this.saveAll(budgets);

        return budgets;

    },

    delete(category){

        const budgets = this.getAll();

        delete budgets[category];

        this.saveAll(budgets);

        return budgets;

    }

};