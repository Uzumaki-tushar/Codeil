const Post = require('../models/post');
const Comment= require('../models/comments');

module.exports.createPost=async(req,res)=>{
    try{
        const {content}=req.body;
        const user=req.user;
        if(!user){
            return res.status(401).json("anthorize");
        }
        const post = await Post.create({
            content,
            user:user._id,
        });
        return res.status(201).redirect('/');
    }
    catch(error){
        console.log(error);
    }
}

module.exports.destroy= async function(req,res){
    try{
        const postId = req.params.id;
        const post = await Post.findById(postId);
        // user .id to convert object the string
        if(post.user==req.user.id){
            await Post.deleteOne({_id:post._id});

            await Comment.deleteMany({post:postId});
            return res.status(200).redirect('/');
        }
        else{
            return res.status(403).json("you can't delete this post");
        }
    }
    catch(error){
        console.log(error);
        return res.status(400).json("error");
    }
}