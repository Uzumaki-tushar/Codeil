const User=require('../models/user');
module.exports.profile=async function(req,res){
    const user=await User.findById(req.params.id).select("-password");
    res.render('profile',{profile_user:user});   
}

module.exports.profileUpdate=async function(req,res){
    try{
    if(req.user.id==req.params.id){
      const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
      return res.redirect('/users/profile/'+req.params.id);
    }
    else{
        return res.status(401).json("anuthorized");
    }

    }
    catch(error){
        console.log(error);
        return res.status(501).json("Something went wrong");
    }

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
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}

module.exports.logout=function(req,res){
    // res.cookie('user',"");
    // return res.redirect('/');
    req.logout(function(err) {
        if (err) {
            req.flash('error','Something went wrong');
            return next(err); }
        req.flash('success','Logged out Successfully'); 
        res.redirect('/');
      });
}