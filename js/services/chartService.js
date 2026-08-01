
const ChartService = {updateExpenseChart(){

    if(expenseChart){

        expenseChart.destroy();

    }

    expenseChart = new Chart(

        expenseChartCanvas,

        {

            type:"pie",

            data:{

                labels:

                    Object.keys(

                        financialReport.categoryTotals

                    ),

                datasets:[{

                    data:

                        Object.values(

                            financialReport.categoryTotals

                        ),

                    backgroundColor:[

                        "#3B82F6",
                        "#22C55E",
                        "#F59E0B",
                        "#EF4444",
                        "#8B5CF6",
                        "#14B8A6",
                        "#EC4899",
                        "#84CC16"

                    ]

                }]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false

            }

        }

    );

},
updateIncomeExpenseChart(){

    if(incomeExpenseChart){

        incomeExpenseChart.destroy();

    }

    incomeExpenseChart = new Chart(

        incomeExpenseChartCanvas,

        {

            type:"bar",

            data:{

                labels:[

                    "Income",

                    "Expense"

                ],

                datasets:[{

                    label:"Amount",

                    data:[

                        financialReport.income,

                        financialReport.expense

                    ],

                    backgroundColor:[

                        "#22C55E",

                        "#EF4444"

                    ]

                }]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false,

                plugins:{

                    legend:{

                        display:false

                    }

                }

            }

        }

    );

},

updateMonthlyExpenseChart(){

    if(monthlyExpenseChart){

        monthlyExpenseChart.destroy();

    }

    monthlyExpenseChart = new Chart(

        monthlyExpenseChartCanvas,

        {

            type:"line",

            data:{

                labels:

                    Object.keys(

                        financialReport.monthlyTotals

                    ),

                datasets:[{

                    label:"Monthly Expense",

                    data:

                        Object.values(

                            financialReport.monthlyTotals

                        ),

                    fill:true,

                    tension:0.3,

                    borderColor:"#3B82F6",

                    backgroundColor:"rgba(59,130,246,0.15)"

                }]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false,

                plugins:{

                    legend:{

                        display:true

                    }

                }

            }

        }

    );

}
};

