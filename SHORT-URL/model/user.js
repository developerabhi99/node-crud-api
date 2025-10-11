const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
     name:{
        type:String
     },
     email:{
        type:String,
        required:true,
        unique:true
     },
     role:{
      type:String,
     },
     password:{
        type:String,
        required:true,
     }
},{timestamps:true})

const User = mongoose.model("users",userSchema);

module.exports=User;