const userController = require('../controller/UserController');
const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/verification');
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', verifyToken, (req,res)=>{
    res.json({message:"You have access to this route",user:req.user});
});

module.exports = router;