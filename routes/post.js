const express = require('express');
const router=express.Router();
const passport = require('passport');
const postController=require('../controllers/post_controller');

router.post('/create-post',passport.checkAuthentication,postController.createPost);
router.get('/delete/:id',passport.checkAuthentication,postController.destroy);

module.exports=router;

