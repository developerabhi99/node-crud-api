const path = require("path");
const express = require("express");
const userRoute = require("./routes/user");
const userBlog = require("./routes/blog");
const userComment = require("./routes/comment");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkAuthenticationCookies } = require("./middlewares/authentication");
const Blog = require("./models/blog");

const app = express();
const PORT=8002;

mongoose.connect("mongodb://127.0.0.1:27017/blog").then((e)=> console.log("Mongo DB connected !!"));

// ejs template engine setup
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser()); 
app.use(express.static(path.resolve("./public")));
app.use(checkAuthenticationCookies("token"));
app.get("/",async (req,res)=>{
    const blogs=await Blog.find({});
    res.render("home",{
        "user":req.user,
        "blogs":blogs
    });
})

app.use("/user",userRoute);
app.use("/blog",userBlog);
app.use("/blog/comment",userComment);

app.listen(PORT,()=>console.log(`Server started on PORT : ${PORT}`));
