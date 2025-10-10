const express = require("express");

const {connectMongo} = require("./models/connection")
const userRouter=require("./routes/user")
const {logReqRes}=require('./middleware')

const app = express();
const PORT=8000;

//connection
connectMongo("mongodb://127.0.0.1:27017/youtube-db")
.then(()=>console.log("Mongo DB connected successfully"))
.catch((err)=>console.log("Error while connecting mongo ",err))




app.use(express.json());
app.use(logReqRes("log.txt") );

app.use('/api/users',userRouter);

app.listen(PORT,()=> console.log(`Server up and running at PORT ${PORT}`))
