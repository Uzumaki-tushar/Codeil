const Post = require('../models/post');
const Comment=require('../models/comments');

module.exports.create= async function(req,res){
    try{
        const {content}=req.body;
        // console.log(typeof JSON.stringify(req.params));
        const post=await Post.findById(req.params.id);
        if(post){
        const newComment=await Comment.create({
            content,
            post:post._id,
            user:req.user._id,
        })

        await post.comments.push(newComment._id);
        await post.save();
        res.status(201).redirect('/');
        }
        else{
            res.status(404).send("Post not found");
        }

    }
    catch(err){
        console.log(err);
        return res.status(500);
    }
}

