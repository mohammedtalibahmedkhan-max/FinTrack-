/*
====================================================
Validation Service
====================================================

This file validates all user input.

Responsibilities

✓ Validate Transactions
✓ Validate Budgets
✓ Validate Goals
✓ Reusable everywhere

====================================================
*/

const ValidationService = {

    validateTransaction(data){

        if(data.title.trim() === ""){

            return{

                valid:false,

                message:"Title is required."

            };

        }

        if(data.amount <= 0){

            return{

                valid:false,

                message:"Amount must be greater than zero."

            };

        }

        if(data.category === ""){

            return{

                valid:false,

                message:"Please select a category."

            };

        }

        if(data.type === ""){

            return{

                valid:false,

                message:"Please select transaction type."

            };

        }

        if(data.date === ""){

            return{

                valid:false,

                message:"Date is required."

            };

        }

        return{

            valid:true

        };

    },

    validateBudget(category,amount){

        if(category===""){

            return{

                valid:false,

                message:"Select a budget category."

            };

        }

        if(amount<=0){

            return{

                valid:false,

                message:"Budget amount must be greater than zero."

            };

        }

        return{

            valid:true

        };

    },

    validateGoal(name,target){

        if(name.trim()===""){

            return{

                valid:false,

                message:"Goal name is required."

            };

        }

        if(target<=0){

            return{

                valid:false,

                message:"Goal amount must be greater than zero."

            };

        }

        return{

            valid:true

        };

    }

};