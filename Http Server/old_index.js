const http=require("http")
const fs=require("fs")
const url=require("url")
const express=require("express")

const app=express()

const handler=(req,res)=>{
    // console.log("pinging ",req.headers['x-forwarded-for'])
    const parsedUrl=url.parse(req.url,true);
     if (req.url === '/favicon.ico') return res.end();
     fs.appendFile('./log.txt',Date.now()+' '+ req.url+'\n',(err,data)=>{
        // res.end("Hello how are you ?");
        console.log("parsed Url ",parsedUrl);
         switch(parsedUrl.pathname){
             case "/": res.end("Welcome to home page");
             break;
             case '/about':
                 const name=parsedUrl.query.name
                 res.end(`Hi, ${name}`);
                 break;
             default: res.end("404");
         }
     })
 
     
 }

 app.get('/',(req,res)=>{
    res.send("Welcome to home page")
 })
const server=http.createServer(app)

server.listen(8000,()=>{
    console.log("My server is up and running at Port 8000")
})