const express=require('express')

const app=express()
const port=8000


app.get('/',(req,res)=>{
    res.send("Hello from Home");
})

app.get('/about',(req,res)=>{
    res.send("Hello from About");
})

app.listen(port,()=>{
    console.log(`Server up and running on Port ${port}`);
})