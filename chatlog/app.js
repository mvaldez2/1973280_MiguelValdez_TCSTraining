let app = require("express")();
let http = require("http").Server(app);   
let io = require("socket.io")(http);
let mongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017"

let port = 9080

app.get("/",(req,res)=> {
    res.sendFile(__dirname+"/index.html");
})

io.on("connection",(socket)=> {
    console.log("Begin Chatting!")
    socket.on("chat",(msg)=> {
        mongoClient.connect(url, { useUnifiedTopology: true }, (err1, client) => {
            if (!err1) {
                let db = client.db("meanstack");
                db.collection("chatlog").insertOne({name: msg.name, message: msg.message}, (err2, result) => {
                    if (!err2) {
                        console.log("Inserted chatlog:")
                        console.log(result.ops);
                    } else {
                        console.log(err2.message);
                    }
                    client.close();
                });
    
            }
        });
    })
})
http.listen(port,()=>console.log('server running on http://localhost:'+ port));