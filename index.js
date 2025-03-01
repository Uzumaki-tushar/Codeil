const express = require('express');
const app=express();
const port=8000;
const cookieParser = require('cookie-parser');
const db = require('./config/db');
// used for session cookie and auth passport
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo');
const sassMiddleware=require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest:'./assets/css',
    debug: true,
    // outputStyle:'extended',
    prefix:'/css'
}))

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
// mongo store is used to store the session cookie in db
app.use(session({
    name:'codeial',
    secret:'shhhh',
    saveUninitialized:false,
    resave:false, 
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl:'mongodb://localhost:27017/codeil',
        autoRemove:'disabled',
    }, function(err){
        console.log(err|| 'connect-mongodb setup');
    }
    )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);



// set up view engine
app.use(express.static('assets'));
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