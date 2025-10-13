const {Router} = require("express");
const Blog = require("../models/blog");
const Comment = require("../models/comment");

const router = Router();

router.post("/:id",async (req,res)=>{
    const blodId=req.params.id;
    await Comment.create({
        comment:req.body.comment,
        commentedBy:req.user._id,
        blog:blodId
    })

    res.redirect(`/blog/${blodId}`);
});

module.exports=router;


