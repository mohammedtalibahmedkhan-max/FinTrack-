/*
====================================================
FORMATTER UTILITY
====================================================

Contains reusable formatting functions.

This file should NEVER modify data.

It only formats data for display.

====================================================
*/

const Formatter = {

    currency(amount, currency = "₹"){

        return `${currency}${Number(amount).toFixed(2)}`;

    },

    percentage(value){

        return `${Number(value).toFixed(1)}%`;

    },

    number(value){

        return Number(value).toLocaleString();

    },

    date(date){

        return new Date(date).toLocaleDateString();

    }

};