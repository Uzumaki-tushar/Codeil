const express=require('express');
const router=express.Router();
const userController=require('../controllers/user_controllers');
const passport = require('passport');

router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.post('/create',userController.createUser);
router.post('/createSession',passport.authenticate(
    'local',
    {failureRedirect:'/registration'},  
),userController.createSessions);
router.get('/logout',passport.checkAuthentication,userController.logout);
router.post('/profile/update/:id',passport.checkAuthentication,userController.profileUpdate);


module.exports=router;