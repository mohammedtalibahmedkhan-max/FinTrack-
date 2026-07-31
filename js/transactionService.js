/*
====================================================
Transaction Service
====================================================
This file is responsible for managing transactions.

Responsibilities:

✔ Add Transaction
✔ Update Transaction
✔ Delete Transaction
✔ Get Transaction
✔ Validation
====================================================
*/

const TransactionService = {

    getAll(){

        return Storage.getTransactions();

    },

    saveAll(transactions){

        Storage.saveTransactions(transactions);

    },

    validate(transaction){

    if(!transaction.title){

        throw new Error(
            "Title is required."
        );

    }

    if(transaction.amount <= 0){

        throw new Error(
            "Amount must be greater than zero."
        );

    }

    if(!transaction.category){

        throw new Error(
            "Category is required."
        );

    }

    if(!transaction.type){

        throw new Error(
            "Type is required."
        );

    }

    if(!transaction.date){

        throw new Error(
            "Date is required."
        );

    }

    return true;

},
     

    add(transaction){

    this.validate(transaction);

    const transactions =
    this.getAll();

    transactions.push(transaction);

    this.saveAll(transactions);

    return transactions;

},

    delete(id){

        let transactions = this.getAll();

        transactions = transactions.filter(function(item){

            return item.id !== id;

        });

        this.saveAll(transactions);

        return transactions;

    },

    update(updatedTransaction){

            this.validate(updatedTransaction);
        const transactions = this.getAll();

        const index = transactions.findIndex(function(item){

            return item.id === updatedTransaction.id;

        });

        if(index !== -1){

            transactions[index] = updatedTransaction;

        }

        this.saveAll(transactions);

        return transactions;

    },

    getById(id){

        const transactions = this.getAll();

        return transactions.find(function(item){

            return item.id === id;

        });

    }

};