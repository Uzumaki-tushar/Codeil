const User=require('../models/user');
module.exports.profile=async function(req,res){
    // res.end("<h1>Welcome to user Profile</h1>")
    let userId = req.cookies.user;
    // console.log(userId);
    if(!userId){
        res.redirect('/login');
        return;
    }
    if(userId){
        let user=await User.findById(userId);
        if(user){
            res.end(`<h2>Welcome ${user.username}</h2>`)
        }else{
            res.cookies('user', "");
            return res.render('/home');
        }
    }
}

module.exports.login=function(req,res){
    res.render('login',{title:"login Page"});
}

module.exports.register=function(req,res){
    res.render('registration',{title:"registration Page"});
}

module.exports.createUser=async function(req,res){
    let {username,email,password,confirm_password}=req.body;
    if(password!=confirm_password)return res.redirect('/registration');
    //create user in db
    const user=await User.findOne({email:req.body.email});
    if(user){console.log("user already exists");return}

    if(!user){
        User.create(req.body)
        .then(function(){return res.redirect('/login')})
        .catch(function(err){console.log(`Error creating user ${err.message}`)})
    }
    
}

module.exports.createSessions=async function(req,res){
    // let {email,password}=req.body;
    // const user=await User.findOne({email:email});
    // if(!user)return res.redirect('/login');
    // if(password!=user.password)return res.redirect('/login');
    
    // //generate session for user
    // res.cookie('user',user.id);
    return res.redirect('/');
}

module.exports.logout=function(req,res){
    // res.cookie('user',"");
    // return res.redirect('/');
}