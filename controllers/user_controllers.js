const User=require('../models/user');
module.exports.profile=async function(req,res){
    res.render('profile');   
}

module.exports.login=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    res.render('login',{title:"login Page"});
}

module.exports.register=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
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
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}