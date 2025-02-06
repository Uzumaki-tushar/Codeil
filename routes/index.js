const express = require('express');
const router=express.Router();
const homeContoller =require('../controllers/home_controllers.js');
const userController=require('../controllers/user_controllers.js');

router.get('/',homeContoller.home);
router.use('/users',require('./users.js'));
router.get('/login',userController.login);
router.get('/registration',userController.register);


module.exports=router;