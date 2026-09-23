let expenses =
JSON.parse(localStorage.getItem("evenExpenses")) || [];




let total = 0;

let highest = 0;



expenses.forEach(e=>{

total += e.amount;

if(e.amount > highest){

highest=e.amount;

}

});



document.getElementById("total")
.innerHTML="₹"+total;



document.getElementById("highest")
.innerHTML="₹"+highest;



document.getElementById("count")
.innerHTML=expenses.length;






// MONTHLY CHART


new Chart(
document.getElementById("expenseChart"),
{

type:"bar",

data:{

labels:expenses.map(e=>e.title),

datasets:[{

label:"Amount",

data:expenses.map(e=>e.amount)

}]

},

options:{

responsive:true

}


});








// GROUP CHART


let groups={};


expenses.forEach(e=>{


if(groups[e.group]){

groups[e.group]+=e.amount;

}

else{

groups[e.group]=e.amount;

}


});




new Chart(

document.getElementById("groupChart"),

{

type:"doughnut",

data:{

labels:Object.keys(groups),

datasets:[{

data:Object.values(groups)

}]


}

}


);








// CATEGORY MOCK DATA


new Chart(

document.getElementById("categoryChart"),

{

type:"pie",

data:{


labels:[

"Food",

"Travel",

"Shopping",

"Others"

],


datasets:[{

data:[

40,

25,

20,

15

]


}]

}


}

);