const Post=require('../models/post');
const User=require('../models/user');


module.exports.home= async function(req,res){
    const posts=await Post.find().populate('user').populate({
        path:'comments',
        populate:{
            path:'user',
        }
    })
    const allUsers=await User.find();
    return res.render('home',{posts:posts ,allUsers:allUsers});
}