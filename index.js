const express = require('express');
const app=express();
const port=8000;
const cookieParser = require('cookie-parser');
const dp = require('./config/db');
// used for session cookie and auth passport
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    name:'codeial',
    secret:'shhhh',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }
}));
app.use(passport.initialize());
app.use(passport.session());



// set up view engine
app.set('view engine','ejs');
app.set('views','./views');

// use express Router
app.use('/',require('./routes/index'));

app.listen(port,function(error){
    if(error){
        console.log(`Error in running server : ${error}`);
        return;
    }

    console.log(`Server running on port ${port}`);
})