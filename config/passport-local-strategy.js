const passport = require('passport');

const LocalStrategy=require('passport-local').Strategy;
const User= require('../models/user');


// authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email'
    },
    async function(email,password,done){
        // find a user and establish the identity
        try{
            let user=await User.findOne({email});
            if(!user || user.password!=password){
                console.log('Invalid username/Password');
                return done(null,false);
            }
            return done(null,user);
        }
        catch(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        
    }
));

// serializing the user to decide which key is to be kept in the cookie
passport.serializeUser(function(user,done){
    done(null,user.id);
})


// deserialzing the key from cookie
passport.deserializeUser(async function(id,done){
    try{
        let user=await User.findById(id);
        return done(null,user);
    }
    catch(err){
        console.log('Error in finding user--> Passport');
        return done(err);
    }
    
    
})

// check if the user is authenticatd
passport.checkAuthentication=function(req,res,next){
    // if the user is signed in then pass the req to controller
    if(req.isAuthenticated()){
        return next();
    }

    // if user not signed in
    return res.redirect('/login');
}

// set user for views
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user form the session cookie ans we are just sending this to the locals for the views.
        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;