let mongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017"
let fs = require("fs");

fs.readFile("call_data.json", function (err, data) {
    jsonData = JSON.parse(data);
    mongoClient.connect(url, { useUnifiedTopology: true }, (err1, client) => {
        if (!err1) {
            let db = client.db("meanstack");
            db.collection("call_data").insertMany(jsonData, (err2, result) => {
                if (!err2) {
                    console.log("Succesfully inserted "+result.insertedCount + " records!");
                    console.log(result);
                } else {
                    console.log(err2.message);
                }
                client.close();
            });

        }
    });
});

