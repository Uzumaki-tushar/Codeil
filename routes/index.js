const express = require('express');
const router=express.Router();
const homeContoller =require('../controllers/home_controllers.js');

router.get('/',homeContoller.home);
router.use('/users',require('./users.js'));


module.exports=router;