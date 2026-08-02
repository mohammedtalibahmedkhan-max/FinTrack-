/*
====================================================
CALENDAR RENDERER
====================================================
*/

const CalendarRenderer = {

render(){

calendarGrid.innerHTML="";

const year=
calendarDate.getFullYear();

const month=
calendarDate.getMonth();

calendarTitle.textContent=

calendarDate.toLocaleString(

"default",

{

month:"long",

year:"numeric"

}

);

const firstDay=

new Date(year,month,1).getDay();

const totalDays=

new Date(

year,

month+1,

0

).getDate();

for(let i=0;i<firstDay;i++){

calendarGrid.innerHTML+=

"<div></div>";

}

for(let day=1;day<=totalDays;day++){

const date=

`${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;

let classes="calendar-day";

let marker="";

transactions.forEach(function(transaction){

if(transaction.date===date){

marker=

transaction.type==="Income"

?

"🟢"

:

"🔴";

}

});

bills.forEach(function(bill){

if(bill.dueDate===date){

marker="🟠";

}

});

subscriptions.forEach(function(subscription){

if(subscription.nextPayment===date){

marker="🔵";

}

});

calendarGrid.innerHTML += `

<div

class="${classes}"

onclick="showDayEvents('${date}')">

<div>

${day}

</div>

<div>

${marker}

</div>

</div>

`;

}

}

};