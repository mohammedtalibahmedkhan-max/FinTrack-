/*
====================================================
BILL SERVICE
====================================================
*/

const BillService = {

    getAll(){

        return Storage.getBills();

    },

    saveAll(bills){

        Storage.saveBills(bills);

    },

    add(bill){

        const bills = this.getAll();

        bills.push(bill);

        this.saveAll(bills);

        return bills;

    },

    remove(id){

        const bills = this.getAll().filter(function(item){

            return item.id !== id;

        });

        this.saveAll(bills);

        return bills;

    },

    markPaid(id){

        const bills = this.getAll();

        bills.forEach(function(item){

            if(item.id===id){

                item.paid=true;

            }

        });

        this.saveAll(bills);

        return bills;

    }

};