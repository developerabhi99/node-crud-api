const express = require("express");
const users = require("./data/MOCK_DATA.json")
const fs= require("fs")
const app = express();
const PORT=8000;

// app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use((req,res,next)=>{
    fs.appendFile('log.txt',`\n ${Date.now()}: User Ip ${req.ip} request on ${req.method} ${req.url} : ${req.path}`,(err,data)=>{
        next();
    })

})
//Api for returning html response
app.get('/users',(req,res)=>{
    const htmlRes=`
    <ul>
        ${users.map(user => `<li>${user.first_name}</li>`).join('')}
    </ul>
    `

    res.send(htmlRes)
})
//Json return

app.get('/api/users',(req,res)=>{
    res.json(users)
})

app.get('/api/user/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const user= users.find((user)=> user.id === id);

    res.json(user)
})

app.post('/api/users',(req,res)=>{
    const body=req.body;
    users.push({...body,id:users.length+1})

    fs.writeFile('./data/MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        return res.json({
            status:"success",
            id:users.length
        })
    })
    

})
app.patch('/api/user/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const body=req.body;

    const userIndex=users.findIndex((user)=> user.id === id);

    users[userIndex]={...body,id:id}

    fs.writeFile('./data/MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        return res.json({
            status:"success",
            id:id,
            updatedUser:body
        })
    })

    




})
app.delete('/api/user/:id',(req,res)=>{
    const id=parseInt(req.params.id);

    const userIndex=users.findIndex((user)=>user.id === id);

    users.splice(userIndex)
    fs.writeFile('./data/MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        return res.json({
            status:"success",
            id:id,
           
        })
    })
})

app.listen(PORT,()=> console.log(`Server up and running at PORT ${PORT}`))
