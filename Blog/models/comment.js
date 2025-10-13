const {Schema,model} = require("mongoose");

const commentSchema = new Schema({
    comment:{
        type:String,
        required:true
    },
    commentedBy:{
        type:Schema.Types.ObjectId,
        ref:"users"
    },
    blog:{
        type:Schema.Types.ObjectId,
         ref:"blogs"
    }
})

const Comment = model("comments",commentSchema);

module.exports=Comment;