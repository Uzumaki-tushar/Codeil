const Post = require('../models/post');

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