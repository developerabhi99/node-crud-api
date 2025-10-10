const express = require("express")
const URL = require("../model/url")


const router=express.Router();

router.use("/",async (req,res)=>{
    const allUser = await URL.find({});
    res.render("home",{
        urls:allUser
    });
})


module.exports=router;