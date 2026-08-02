/*
====================================================
CALENDAR SERVICE
====================================================
*/

const CalendarService = {

    getEvents(transactions, bills, subscriptions){

        const events = [];

        //------------------------------------------------
        // Transactions
        //------------------------------------------------

        transactions.forEach(function(transaction){

            events.push({

                date: transaction.date,

                title: transaction.title,

                type: transaction.type

            });

        });

        //------------------------------------------------
        // Bills
        //------------------------------------------------

        bills.forEach(function(bill){

            events.push({

                date: bill.dueDate,

                title: bill.title,

                type:"Bill"

            });

        });

        //------------------------------------------------
        // Subscriptions
        //------------------------------------------------

        subscriptions.forEach(function(subscription){

            events.push({

                date: subscription.nextPayment,

                title: subscription.name,

                type:"Subscription"

            });

        });

        //------------------------------------------------
        // Sort

        events.sort(function(a,b){

            return new Date(a.date)-new Date(b.date);

        });

        return events;

    }

};