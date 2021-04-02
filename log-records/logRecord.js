const prompt = require("prompt");
let fs = require("fs");

function loadPrompt() {
  prompt.start();

  prompt.get(["fName", "lName", "gender", "email"], function (err, result) {
    if (err) {
      return onErr(err);
    }
    console.log("  First Name: " + result.fName);
    console.log("  Last Name: " + result.lName);
    console.log("  Gender: " + result.gender);
    console.log("  Email: " + result.email);
    debugger;
    if (fs.existsSync("records.json")) {
      //if the file already exists
      fs.readFile("records.json", function (err, data) {
        var json = JSON.parse(data);
        pushData(result.fName, result.lName, result.gender, result.email, json);
        debugger;
        console.log(json);
      });
    } else {
      // if it does not exist
      var data = [];
      pushData(result.fName, result.lName, result.gender, result.email, data);
      debugger;
    }
  });
}

function onErr(err) {
  console.log(err);
  return 1;
}

function pushData(fName, lName, gender, email, data) {
  data.push({
    fName: fName,
    lName: lName,
    gender: gender,
    email: email,
    created: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
  });
  debugger;
  fs.writeFile("records.json", JSON.stringify(data), function (err) {
    console.log(err);
  });
}

function readData() {
  fs.readFile("records.json", function (err, data) {
    var json = JSON.parse(data);
    console.log(json);
  });
}

module.exports = { readData, loadPrompt };
