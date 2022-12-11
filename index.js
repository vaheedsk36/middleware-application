const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const port = process.env.PORT || 2021;

app.use((req,res,next)=>{
    console.log("Request Date:"+new Date());
    next();
});

app.use((req,res,next)=>{
  let filePath = path.join(__dirname,"static",req.url);
  fs.stat(filePath,(err,fileInfo)=>{
    if(err){
        next();
        return;
    }
    if(fileInfo.isFile()){
        res.sendFile(filePath);
    }else{
        next()
    }

  })

});

app.use((req,res)=>{
    res.status(404);
    res.send("File Not Found !!");
})

app.listen(port,()=>{
    console.log(`Services listening at PORT:${port}`);
});