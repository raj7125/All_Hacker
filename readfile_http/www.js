const http = require('http');
const fs = require('fs');


const server = http.createServer((req,res)=>{
     if(req.url === "/"){
        fs.readFile("./www.html",(err,data)=>{
            if(err) res.end("Err");
            else res.end(data);
        })
     }

     else if(req.url === "/www.css"){
        fs.readFile("./www.css",(err,data)=>{
            res.end(data);
        })
     }

     else{
        res.end("404 error!");
     }
});

server.listen(3000,()=>{
    console.log("Server started...");
})