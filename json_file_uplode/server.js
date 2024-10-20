const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.json());
app.get("/",(req,res)=>{
    let cata = req.query.title;
    console.log(cata)
    if(cata == null){
      res.sendFile(path.join(__dirname,'/pro.json'));
    }
    else{
    let data = fs.readFileSync('./pro.json','utf-8');
    
    data = JSON.parse(data);
    let filldata = data.filter(ele => ele.title==cata);
    res.send(filldata)
   // console.log(filldata);
    }

});
   




app.listen(3001,()=>{
    console.log("Server Started......");
})