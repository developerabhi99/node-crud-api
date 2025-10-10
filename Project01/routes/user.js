const express = require("express")
const userModel=require("../models/user")

const router=express.Router();

//Api for returning html response

//Json return

router.get('/',async (req,res)=>{
    const allUser= await userModel.find({});
    res.json(allUser)
}).post('/',async (req,res)=>{
    const body=req.body;
    const exist=await userModel.findOne({
        email:body.email
    })

    if (exist){
        return res.status(200).json({
            msg:"for these mail user alreday exists"
        })
    }
    const newUser= await userModel.create({
        first_name:body.first_name,
        last_name:body.last_name,
        email:body.email,
        gender:body.gender,
        job_title:body.job_title,
        ip_address:body.ip_address
    })

    return res.status(201).json({
        msg:"success"
    })
    

})

router.get('/:id',async (req,res)=>{
    const id=req.params.id;
    const user= await userModel.findById(id);
   

    res.json(user)
}).patch('/:id',async (req,res)=>{
    const id=req.params.id;
    const body=req.body;

    const user = await userModel.updateOne(
        { _id: req.params.id },     // filter condition
        { $set: req.body }          // update data
      );


    return res.json({
                status:"success",
                updatedUser:user
            })




}).delete('/:id',async (req,res)=>{
    const id=req.params.id;

    const user=await userModel.deleteOne({
        _id: id
    })

          return res.json({
            status:"success",
            id:id,
           
        })
})



module.exports=router