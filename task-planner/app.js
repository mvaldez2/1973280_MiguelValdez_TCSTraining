let http = require("http");
let url = require("url");
let fs = require("fs");
let port = 9090;

// html components
// add task from
let addTask = `
<a href="/display">Display</a> <br> <a href="/delete">Delete Task</a>
<h2> Add Task </h2>
<form action="/task" method="get">
    <label>Emp Id: </label>
    <input type="text" name="empId" /><br />
    <label>Task Id: </label>
    <input type="text" name="taskId" /><br />
    <label>Task: </label>
    <textarea type="text" name="task" ></textarea><br />
    <input type="date" name="deadline">
    <input type="submit" value="Add Task" />
    <input type="reset" value="reset" />
</form>
`;
// display tasks table
let display = `
<a href="/task">Add Task</a> <br> <a href="/delete">Delete Task</a>
<table>
    <tr>
        <td>Emp Id</td>
        <td>Task Id</td>
        <td>Task</td>
        <td>Deadline</td>
    </tr>      
`;
// delete task from
let deleteTask = `
<a href="/display">Display</a> <br> <a href="/task">Add Task</a>
<h2>Delete Task</h2>
 <form action="/delete" method="get" onsubmit="return deleteTaskA()">
     <label>Task Id</label>
     <input type="text" name="taskIdDelete">
     <input type="submit" value="Delete Task" />
    <input type="reset" value="reset" />
 </form>

`;

var jsonData = []; // initialize data
if (fs.existsSync("tasks.json")) { //checks if file exists
    fs.readFile("tasks.json", function (err, data) {
        if (Object.keys(data).length === 0) { //if file is empty, initialize file
            fs.writeFile("tasks.json", JSON.stringify(jsonData), function (err) {
                console.log(err);
            });
        } else { // if not empty creates table rows and appends to display
            jsonData = JSON.parse(data);
            var row = '<tr>';
            for (let index = 0; index < jsonData.length; index++) {

                row += `
                <td> ${jsonData[index].empId} </td>
                <td> ${jsonData[index].taskId} </td>
                <td> ${jsonData[index].task} </td>
                <td> ${jsonData[index].deadline} </td> </tr>
            `;
            }
            display = display + row + '</table>';
        }

    });


}

let server = http.createServer((req, res) => {
    var pathInfo = url.parse(req.url, true).pathname;
    if (req.url != "/favicon.ico") {
        if (pathInfo == "/") { // redirects to task page
            res.writeHead(301, { Location: '/task' });
        } else if (pathInfo == "/task") { 
            task = url.parse(req.url, true).query;
            if (Object.keys(task).length == 0) {
                console.log("Noting to add");
            } else {
                jsonData.push(task); // pushes task to array
                fs.writeFile("tasks.json", JSON.stringify(jsonData), function (err) { // array gets written to the json file
                    console.log(err);
                });
            }
            res.write(addTask);

        } else if (req.url == "/display") {
            res.end(display);

        } else if (pathInfo == "/delete") {
            task = url.parse(req.url, true).query;
            res.write(deleteTask);
            if (jsonData.some(i => i.taskId.includes(task.taskIdDelete))) { // checks if submitted task id is in array and deletes it from the array, updated array gets written to json file
                jsonData = jsonData.filter(i => i.taskId !== task.taskIdDelete);
                fs.writeFile("tasks.json", JSON.stringify(jsonData), function (err) {
                    console.log(err);
                });
            }
        }

    }
    res.end();
})

server.listen(port, () => console.log(`Running on http://localhost:${port}`));