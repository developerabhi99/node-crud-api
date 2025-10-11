const express = require("express");
const URL = require("../model/url");
const User= require("../model/user");
const { v4: uuidv4 } = require("uuid");
const {setUser,getUser} = require("../service/auth");
const { restrictToLoggedInUser } = require("../middlewares/auth");

const router=express.Router();

router.get("/",restrictToLoggedInUser,async (req,res)=>{
    const allUser = await URL.find({createdBy:req.user._id}); 
    res.render("home",{
        urls:allUser
    });
})

router.get("/signup",async (req,res)=>{
    const allUser = await URL.find({});
    res.render("signup");
}).post("/signup",async (req,res)=>{
    const formData=req.body;
   // console.log("formData ",formData);
//    if(!formData.email || !formData.name || !formData.password) return res.status(400).json({msg:"Email , Name and Password required."})
if(!formData.email || !formData.name || !formData.password) return res.render("signup",{"validationErr":"Email , Name and Password required."})

    const exists=await User.findOne({email:formData.email});
    console.log(exists)
  if(exists) return res.render("signup",{"exists":"Email already exists"});
   await User.create({
        name:formData.name,
        email:formData.email,
        password:formData.password
    })

    //return res.status(201).json({msg:"user signed up"})

    res.redirect("login")
    

})

router.get("/login",(req,res)=>{
    return res.render("login");
}).post("/login",async (req,res)=>{
    const body=req.body;
    if(!body.email || !body.password) return res.render("login",{"validationErr":"Email and password required."});
    const user=await User.findOne({email:body.email,password:body.password});
    if (!user){
        return res.render("login",{"error":"Wrong email or password."});
        
    }
    //const id=uuidv4();
    const token=setUser(user);
    res.cookie("uid",token);
    return res.redirect("/");
})


module.exports=router;