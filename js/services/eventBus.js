/*
====================================================
EVENT BUS
====================================================

This service allows different parts of the application
to communicate without directly calling each other.

Instead of:

updateDashboard();
displayTransactions();
updateAnalytics();

We simply emit an event.

====================================================
*/

const EventBus = {

    events:{},

    on(eventName, callback){

        if(!this.events[eventName]){

            this.events[eventName] = [];

        }

        this.events[eventName].push(callback);

    },

    emit(eventName){

        if(!this.events[eventName]){

            return;

        }

        this.events[eventName].forEach(function(callback){

            callback();

        });

    }

};