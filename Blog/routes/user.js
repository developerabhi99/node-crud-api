const {Router} = require("express");
const { user } = require("../models/user");

const router = Router();

router.get("/signup",(req,res)=>{
    res.render("signup");
})

router.post("/signup",async (req,res)=>{
    const body=req.body;
    //console.log("body ",body);
    try{
        await user.create({
            fullname:body.fullname,
            email:body.email,
            password:body.password,
        })

        res.redirect("/user/login");
    }catch(e){
        res.render("signup",{
            "error":"Account with these email exist!!!"
        });
    }
   
    
})

router.get("/login",(req,res)=>{
    res.render("login");
})

router.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    try{
        const token=await user.matchPasswordAndGenerateToken(email,password);   
        res.cookie("token",token);
        res.redirect("/");
    }catch(error){
        res.render("login",{
            "error":`${error}`
        })
    }
   

})

router.get("/logout",(req,res)=>{
    res.clearCookie("token").redirect("/");
})

module.exports=router;


