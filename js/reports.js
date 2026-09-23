let expenses =
JSON.parse(localStorage.getItem("evenExpenses")) || [];




function loadReport(data=expenses){


let table =
document.getElementById("reportTable");


table.innerHTML="";



data.forEach(e=>{


table.innerHTML +=

`

<tr>

<td>${e.title}</td>

<td>${e.group}</td>

<td>${e.paidBy}</td>

<td>₹${e.amount}</td>

<td>₹${Math.round(e.amount/e.members)}</td>

</tr>


`;


});



}



let total=0;

let groupSet=new Set();



expenses.forEach(e=>{

total+=e.amount;

groupSet.add(e.group);

});



document.getElementById("total")
.innerHTML="₹"+total;


document.getElementById("transactions")
.innerHTML=expenses.length;


document.getElementById("groups")
.innerHTML=groupSet.size;





function searchReport(){


let value =
document.getElementById("search")
.value
.toLowerCase();



let result =
expenses.filter(e=>

e.title.toLowerCase()
.includes(value)

);



loadReport(result);

}





function downloadCSV(){


let csv="Title,Group,Paid By,Amount\n";


expenses.forEach(e=>{


csv +=
`${e.title},${e.group},${e.paidBy},${e.amount}\n`;


});



let blob =
new Blob([csv],
{
type:"text/csv"
});



let link =
document.createElement("a");


link.href =
URL.createObjectURL(blob);


link.download="EVEN_Report.csv";


link.click();


}





loadReport();