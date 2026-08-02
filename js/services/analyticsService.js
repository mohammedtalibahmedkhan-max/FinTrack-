/*
====================================================
ANALYTICS SERVICE

Advanced financial analysis

====================================================
*/


const AnalyticsService = {


    generate(report){


        return {


            bestMonth:
            this.getBestMonth(
                report.monthlyTotals
            ),


            worstMonth:
            this.getWorstMonth(
                report.monthlyTotals
            ),


            expenseGrowth:
            this.calculateGrowth(
                report.monthlyTotals
            ),


            categoryRanking:
            this.rankCategories(
                report.categoryTotals
            )


        };


    },



    getBestMonth(months){


        let month="-";

        let value=0;


        for(const key in months){


            if(months[key]>value){


                value=months[key];

                month=key;


            }


        }


        return month;


    },



    getWorstMonth(months){


        let month="-";

        let value=Infinity;


        for(const key in months){


            if(months[key]<value){


                value=months[key];

                month=key;


            }


        }


        return month;


    },



    calculateGrowth(months){


        const values =
        Object.values(months);



        if(values.length < 2){

            return 0;

        }


        const current =
        values[values.length-1];


        const previous =
        values[values.length-2];


        if(previous===0){

            return 0;

        }


        return (

            ((current-previous)/previous)

            *

            100

        ).toFixed(1);


    },



    rankCategories(categories){


        return Object.entries(categories)

        .sort(

            (a,b)=>

            b[1]-a[1]

        );


    }


};