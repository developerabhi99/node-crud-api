const {Router} = require('express');
const multer = require('multer');
const path = require('path');
const Blog = require('../models/blog');
const Comment = require('../models/comment');

const router = Router();

const storage=multer.diskStorage({
   destination: function(req,file,cb){
      cb(null, path.resolve("./public/images/blog"));
   },
   filename:function (req,file,cb){
      cb(null,`${Date.now()} - ${file.originalname}`);
   }
})

const upload = multer({storage});

router.get("/add-new",(req,res)=>{
    res.render("addblog",{
        "user":req.user
    });
})

router.post("/add-new",upload.single('blogImageUrl'),async (req,res)=>{
    const {title,content} = req.body;
    console.log("body",req.body);
    await Blog.create({
        title:title,
        content:content,
        blogImageUrl:`/images/blog/${req.file.filename}`,
        createdBy:req.user._id
    })
    res.redirect("/");
})

router.get("/:id",async (req,res)=>{
    const blogId=req.params.id;
    console.log("blogId",blogId);
    let blog = await Blog.findById(blogId).populate("createdBy");
    const comments = await Comment.find({
        blog:blogId
    }).populate("commentedBy");
    // blog = blog.toObject();
    // if (blog.createdBy) {
    //   delete blog.createdBy.password;
    //   delete blog.createdBy.salt;
    // }
    //console.log("comments",comments);
    
    res.render("blog",{
        "blog":blog,
        "comments":comments,
        "user":req.user
    })
})

module.exports=router;