const {Schema, model} = require('mongoose');
const { user } = require('./user');

const blogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    blogImageUrl:{
        type:String
    },
    createdBy:{
        type:Schema.Types.ObjectId,
         ref: 'users'
    }
},{timestamps:true});


const Blog = model("blogs",blogSchema);

module.exports=Blog;