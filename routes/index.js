const express = require('express');
const router=express.Router();
const homeContoller =require('../controllers/home_controllers.js');

router.get('/',homeContoller.home);



module.exports=router;