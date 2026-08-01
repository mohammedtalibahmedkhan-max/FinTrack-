/*
====================================================
FINANCE SERVICE
====================================================
This service provides all financial calculations
to the UI.

Responsibilities

✔ Get Dashboard Data
✔ Get Analytics Data
✔ Get Insights Data

====================================================
*/

const FinanceService = {

    getFinanceData(){

        const transactions =
        Storage.getTransactions();

        return calculateFinanceData(
            transactions
        );

    }

};