const express = require("express");
const {pipeline} = require("stream");
const { PrismaClient } = require('./generated/prisma')

const app = express();
const PORT = process.env.PORT || 8000;

const prisma = new PrismaClient()

app.use(express.json());

app.get("/",async (req,res)=>{
    const userData = await prisma.user.findMany({
        include: {
            posts: true,
            profile: true,
          },
    });
    res.json({msg:"Hello from home",data:userData});
});

app.listen(PORT,console.log(`Server running on PORT : ${PORT}`));