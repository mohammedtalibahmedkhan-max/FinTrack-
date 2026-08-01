/*
====================================================
GOAL SERVICE
====================================================

Responsible for

✓ Save Goals
✓ Delete Goals
✓ Load Goals

====================================================
*/

const GoalService = {

    getAll(){

        return Storage.getGoals();

    },

    saveAll(goals){

        Storage.saveGoals(goals);

    },

    add(goal){

        const goals = this.getAll();

        goals.push(goal);

        this.saveAll(goals);

        return goals;

    },

    delete(id){

        let goals = this.getAll();

        goals = goals.filter(function(goal){

            return goal.id !== id;

        });

        this.saveAll(goals);

        return goals;

    },

    getById(id){

        const goals = this.getAll();

        return goals.find(function(goal){

            return goal.id === id;

        });

    }

};