const {Schema ,model} = require("mongoose");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const { createTokenForUser } = require("../utils/authentication");

const userSchema = new Schema({
    fullname:{
        type:String,
        required:true
    },
    profileImage:{
       type:String,
       default:"/images/default.png"
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salt:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    roles:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    }
},{timestamps:true})



//middleware that checks before saving
userSchema.pre('save',async function (next){
    const user=this;
    if(!user.isModified("password")) return ;

    const salt = await bcrypt.genSalt(14);
    const hashedPassword =await bcrypt.hash(this.password,salt);
    this.salt=salt;
    this.password=hashedPassword;
    next(); 
});

//model defined function
userSchema.static("matchPasswordAndGenerateToken",async function (email,password){
    const user = await this.findOne({email});
    if(!user) throw new Error("user not found");
    const salt = user.salt;
    const hashedPassword =await bcrypt.hash(password,salt);

    if(user.password !== hashedPassword) throw new Error("Incorrect password");

    const validUser={...user.toObject(),password:undefined,salt:undefined};

    const token = createTokenForUser(validUser);

    return token;

})

const user = model("users",userSchema);

module.exports={
    user
}