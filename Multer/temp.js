const express = require('express');
const fs= require('fs');
const app = express();
const multer = require('multer');
app.use(express.static(__dirname)); // m
app.use(express.json()); // m
app.use(express.urlencoded({ extended: false }));// m

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file);
        cb(null, __dirname + '/asset');
    },
    filename: (req, file, cb) => {
 let name = Date.now() + ".jpg";
        cb(null, name);
    }
});
const filter = (req, file, cb) => {
    let ext = file.mimetype.split('/')[1];
    if (ext == 'jpg' || ext == 'jpeg') {
        cb(null, true)
    }
    else {
        cb(new Error("Invalid file extension"), false);
    }
}
const maxSize = 10 * 1024 * 1024;
const upload = multer({ storage: storage, fileFilter: filter, limits: { fileSize: maxSize } });



app.get("/", (req, res) => {
    res.sendFile(__dirname + "/mult.html");
})

app.post("/run", upload.array('pic', 5), (req, res) => {
    console.log(req.files.filename);
    
    console.log(req.body);
    fs.readFile(__dirname+'/product.json','utf-8',(err, data) => {
        data=JSON.parse(data);
        data.push(req.body);
        fs.writeFileSync(__dirname+'/product.json',JSON.stringify(data));
    })
    res.redirect("/mult.html")
});
app.listen(3000);