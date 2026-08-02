/*
====================================================
SUBSCRIPTION SERVICE
====================================================
*/

const SubscriptionService = {

    getAll(){

        return JSON.parse(

            localStorage.getItem("subscriptions")

        ) || [];

    },

    saveAll(subscriptions){

        localStorage.setItem(

            "subscriptions",

            JSON.stringify(subscriptions)

        );

    },

    add(subscription){

        const subscriptions = this.getAll();

        subscriptions.push(subscription);

        this.saveAll(subscriptions);

        return subscriptions;

    },

    delete(id){

        const subscriptions =

        this.getAll().filter(function(item){

            return item.id !== id;

        });

        this.saveAll(subscriptions);

        return subscriptions;

    },

    /*====================================================
MARK AS PAID
====================================================*/

markPaid(id){

    const subscriptions = this.getAll();

    subscriptions.forEach(function(item){

        if(item.id === id){

            item.lastPaid = new Date()
                .toISOString()
                .split("T")[0];

        }

    });

    this.saveAll(subscriptions);

    return subscriptions;

},

/*====================================================
TOTAL MONTHLY COST
====================================================*/

getMonthlyCost(){

    return this.getAll().reduce(function(total,item){

        if(item.frequency==="Monthly"){

            return total + item.amount;

        }

        return total + item.amount/12;

    },0);

}
};