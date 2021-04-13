let app = require("express")();
let http = require("http").Server(app);   
let io = require("socket.io")(http);

let port = 9080

app.get("/",(req,res)=> {
    res.sendFile(__dirname+"/index.html");
})

io.on("connection",(socket)=> {
    console.log("Begin Chatting!")
    socket.on("chat",(msg)=> {
        console.log("Name: " + msg.name);
        console.log("Message: "+ msg.message);
    })
})
http.listen(port,()=>console.log('server running on http://localhost:'+ port));