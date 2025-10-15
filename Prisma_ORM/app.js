const express = require("express");
const {pipeline} = require("stream");

const app = express();
const PORT = process.env.PORT || 8000;

app.get("/",(req,res)=>{
    res.json({msg:"Hello from home"});
});

app.listen(PORT,console.log(`Server running on PORT : ${PORT}`));