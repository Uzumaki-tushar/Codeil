const express = require('express');
const router = express.Router();

const passport = require('passport');
const commentController=require('../controllers/comment_controllers');

router.post('/create/:id',passport.checkAuthentication,commentController.create);
router.get('/delete/:id',passport.checkAuthentication,commentController.delete);

module.exports=router;