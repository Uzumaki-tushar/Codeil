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

module.exports=passport;