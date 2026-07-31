/*=========================================
LOAD DATA
=========================================*/

const transactions =
JSON.parse(
    localStorage.getItem("transactions")
) || [];

const budgets =
JSON.parse(Storage.getBudgets()) || {};

const savingsGoal =
Number(localStorage.getItem("savingsGoal")) || 0;

const settings =

JSON.parse(

localStorage.getItem("settings")

) || {};

const currency =

settings.currency || "₹";

let expenseTransactions =

transactions.filter(function(transaction){

return transaction.type==="Expense";

});

let totalExpense = 0;

expenseTransactions.forEach(function(transaction){

totalExpense += transaction.amount;

});

let averageExpense = 0;

if(expenseTransactions.length>0){

averageExpense =

totalExpense /

expenseTransactions.length;

}

document.getElementById(

"average-expense"

).textContent =

currency +

averageExpense.toFixed(2);

let largestExpense =

0;

expenseTransactions.forEach(function(transaction){

if(transaction.amount >

largestExpense){

largestExpense =

transaction.amount;

}

});

document.getElementById(

"largest-expense"

).textContent =

currency +

largestExpense.toFixed(2);

const categoryTotals = {};

expenseTransactions.forEach(function(transaction){

if(!categoryTotals[transaction.category]){

categoryTotals[transaction.category]=0;

}

categoryTotals[transaction.category]+=

transaction.amount;

});

let highestCategory="";

let highestAmount=0;

for(const category in categoryTotals){

if(categoryTotals[category]>

highestAmount){

highestAmount=

categoryTotals[category];

highestCategory=category;

}

}

document.getElementById(

"top-category"

).textContent=

highestCategory || "-";

let income = 0;

transactions.forEach(function(transaction){

if(transaction.type==="Income"){

income += transaction.amount;

}

});

let score = 0;

if(income>0){

score =

Math.max(

0,

100 -

(totalExpense/income)*100

);

}

document.getElementById(

"health-score"

).textContent =

score.toFixed(0) + "%";

new Chart(

document.getElementById(

"analyticsChart"

),

{

type:"bar",

data:{

labels:Object.keys(categoryTotals),

datasets:[{

label:"Expense",

data:Object.values(categoryTotals)

}]

}

});


/*=========================================
TIMELINE CHART
=========================================*/

function createTimelineChart(){

const incomeTotals = {};

const expenseTotals = {};

transactions.forEach(function(transaction){

const month = new Date(transaction.date)

.toLocaleString(

"default",

{

month:"short"

}

);

if(transaction.type === "Income"){

incomeTotals[month] =

(incomeTotals[month] || 0)

+

transaction.amount;

}else{

expenseTotals[month] =

(expenseTotals[month] || 0)

+

transaction.amount;

}

});

const labels = [

"Jan",

"Feb",

"Mar",

"Apr",

"May",

"Jun",

"Jul",

"Aug",

"Sep",

"Oct",

"Nov",

"Dec"

];

const incomeData =

labels.map(function(month){

return incomeTotals[month] || 0;

});

const expenseData =

labels.map(function(month){

return expenseTotals[month] || 0;

});

new Chart(

document.getElementById(

"timelineChart"

),

{

type:"line",

data:{

labels:labels,

datasets:[

{

label:"Income",

data:incomeData,

borderColor:"#22C55E",

backgroundColor:"#22C55E",

tension:.4

},

{

label:"Expense",

data:expenseData,

borderColor:"#EF4444",

backgroundColor:"#EF4444",

tension:.4

}

]

}

}

);

}

/*=========================================
SUMMARY CARDS
=========================================*/

function displaySummary(){

let income = 0;

let expense = 0;

transactions.forEach(function(transaction){

if(transaction.type === "Income"){

income += transaction.amount;

}else{

expense += transaction.amount;

}

});

const savings = income - expense;

let savingsRate = 0;

if(income > 0){

savingsRate = (savings / income) * 100;

}

document.getElementById(

"summary-income"

).textContent =

currency +

income.toFixed(2);

document.getElementById(

"summary-expense"

).textContent =

currency +

expense.toFixed(2);

document.getElementById(

"summary-savings"

).textContent =

currency +

savings.toFixed(2);

document.getElementById(

"summary-rate"

).textContent =

savingsRate.toFixed(1) + "%";

}

/*=========================================
TOP 5 SPENDING CATEGORIES
=========================================*/

function displayTopCategories(){

const totals = {};

transactions.forEach(function(transaction){

if(transaction.type !== "Expense"){

return;

}

if(!totals[transaction.category]){

totals[transaction.category] = 0;

}

totals[transaction.category] += transaction.amount;

});

const sorted =

Object.entries(totals)

.sort(function(a,b){

return b[1] - a[1];

})

.slice(0,5);

const container =

document.getElementById(

"top-categories"

);

container.innerHTML = "";

if(sorted.length === 0){

container.innerHTML =

"<p>No expense data available.</p>";

return;

}

const highest = sorted[0][1];

sorted.forEach(function(item){

const category = item[0];

const amount = item[1];

const percentage =

(amount / highest) * 100;

container.innerHTML += `

<div class="category-item">

<div class="category-header">

<span>${category}</span>

<span>${currency}${amount.toFixed(2)}</span>

</div>

<div class="category-progress">

<div

class="category-fill"

style="width:${percentage}%">

</div>

</div>

</div>

`;

});

}

/*=========================================
AI FINANCIAL INSIGHTS
=========================================*/

function displayInsights(){

const container =

document.getElementById(

"financial-insights"

);

container.innerHTML = "";

if(transactions.length===0){

container.innerHTML=

"<p>No transactions available.</p>";

return;

}

let income=0;

let expense=0;

let largestExpense=0;

let largestCategory="";

const categoryTotals={};

let expenseCount=0;

transactions.forEach(function(transaction){

if(transaction.type==="Income"){

income+=transaction.amount;

}else{

expense+=transaction.amount;

expenseCount++;

if(transaction.amount>largestExpense){

largestExpense=

transaction.amount;

largestCategory=

transaction.category;

}

if(!categoryTotals[transaction.category]){

categoryTotals[transaction.category]=0;

}

categoryTotals[transaction.category]+=

transaction.amount;

}

});

const savings=

income-expense;

const savingsRate=

income>0

?

(savings/income)*100

:

0;

const averageExpense=

expenseCount>0

?

expense/expenseCount

:

0;

let highestCategory="";

let highestAmount=0;

for(const category in categoryTotals){

if(categoryTotals[category]>

highestAmount){

highestAmount=

categoryTotals[category];

highestCategory=

category;

}

}

let percentage=0;

if(expense>0){

percentage=

(highestAmount/expense)*100;

}

const insights=[];

insights.push(

`💰 Largest expense category is ${highestCategory}
(${currency}${highestAmount.toFixed(2)}).`

);

insights.push(

`📊 ${percentage.toFixed(1)}% of your expenses are spent on ${highestCategory}.`

);

if(savingsRate >= 40){

insights.push(

"✅ Excellent! Your savings rate is outstanding."

);

}else if(savingsRate >=20){

insights.push(

"🙂 Good savings rate. Keep improving."

);

}else if(savingsRate >0){

insights.push(

"⚠ Your savings rate is low."

);

}else{

insights.push(

"🚨 You are spending more than you earn."

);

}

insights.push(

`📈 Average expense per transaction is

${currency}${averageExpense.toFixed(2)}.`

);

insights.push(

`🧾 You have

${transactions.length}

transactions recorded.`

);

insights.push(

`🔥 Highest single expense:

${currency}${largestExpense.toFixed(2)}.`

);

if(categoryTotals["Shopping"]){

const shoppingPercent =

(categoryTotals["Shopping"]/expense)*100;

if(shoppingPercent>30){

insights.push(

"🛍 Shopping expenses are unusually high."

);

}

}

if(categoryTotals["Food"]){

const foodPercent =

(categoryTotals["Food"]/expense)*100;

if(foodPercent>40){

insights.push(

"🍕 Food spending is consuming a large part of your expenses."

);

}

}

let exceeded = false;

for(const category in budgets){

let spent = 0;

transactions.forEach(function(transaction){

if(

transaction.type==="Expense"

&&

transaction.category===category

){

spent += transaction.amount;

}

});

if(spent>budgets[category]){

exceeded = true;

}

}

if(exceeded){

insights.push(

"🚨 One or more budgets have been exceeded."

);

}else{

insights.push(

"✅ Great! All budgets are under control."

);

}

if(savingsGoal>0){

if(savings>=savingsGoal){

insights.push(

"🎯 Congratulations! Savings goal achieved."

);

}else{

insights.push(

`🎯 ₹${(savingsGoal-savings).toFixed(2)}

needed to reach your savings goal.`

);

}

}

insights.forEach(function(message){

container.innerHTML+=`

<div class="insight-card">

${message}

</div>

`;

});

}

displaySummary();

createTimelineChart();

displayTopCategories();

displayInsights();