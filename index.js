const express = require('express');
const app=express();
const port=8000;

// use express Router
app.use('/',require('./routes/index'));

app.listen(port,function(error){
    if(error){
        console.log(`Error in running server : ${error}`);
        return;
    }

    console.log(`Server running on port ${port}`);
})