// Submits budget plan data to session storage in an array
function onFormSubmit(){ 
    var plan = {
        clientName: document.getElementById("clientName").value,
        projectName: document.getElementById("projectName").value,
        budget: document.getElementById("budget").value
    };
    var data = JSON.parse(sessionStorage.getItem('data')) || [];
    data.push(plan);
    sessionStorage.setItem("data", JSON.stringify(data));
    clearForm();
}
function clearForm(){
    document.getElementById("clientName").value="";
    document.getElementById("projectName").value="";
    document.getElementById("budget").value="";
}

//Parses the json object
var plans = JSON.parse(sessionStorage.getItem('data'));
//Gets tbody element
var tbody = document.getElementById('data');
//To calculate total budget
var totalBudget = 0;
//Loops through session data to display on table
for (let index = 0; index < plans.length; index++) {
    var row = '<tr>';
    row += '<td>' + plans[index].clientName + '</td>' + '<td>' + plans[index].projectName + '</td>' + '<td>$' + plans[index].budget + '</td>';
    tbody.innerHTML += row;
    totalBudget += Number(plans[index].budget) //converts value to number and gets total budget so far
    
}
//To display total budget
document.getElementById("totalBudget").innerHTML = totalBudget;
