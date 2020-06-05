const express = require('express');
const router = express.Router();  //Router() is middle ware in express 
const passport = require('passport');//passport middle ware for authentification
const jwt = require('jsonwebtoken');//JSON Web Token 
const config = require('../config/database');
const User = require('../model/users');

//Handle the register request for new user

router.post('/register', (req, res, next) => {
        //res.send('REGISTER');
        let newUser = new User({
            name: req.body.name,
            employeeID:req.body.employeeID,
            username: req.body.username,
            password: req.body.password
        });
        //console.log(newUser);
        //Register the user credential in to database
        User.getUserByUsername(newUser.username,(err,user1)=>{
          if(err)
          res.json({success: '-1', msg:'Failed to register you'});
          else if(user1)
          {
            //console.log("u1: ",user1);
            res.json({success:'0',msg:'This username is already exist'});
          }
          else
          {
            User.addUser(newUser, (err, user) => {
              if(err){
                res.json({success: '-1', msg:'Failed to register you'});
              } else {
                res.json({success: '1', msg:'you are registered'});  
              }
            });
          }
        });
});

//Authenticate Login User
router.post('/authenticate', (req, res, next) => {
   // res.send('AUTHENTICATE');
 
    const Username = req.body.username;
    const password = req.body.password;

    // check if Username is exist or not
    User.getUserByUsername(Username,(err , user) =>{
      if (err)
        throw err;
      
        if(!user)
      {
        return res.json({success:false,msg:'User not found'});
      }
      //Check password is right or not
      User.ComparePassword(password,user.password,(err,isMatch)=>{
        if(err)
          throw err;
         
        //send the response with genrated token by jwt
        if(isMatch){
          const token = jwt.sign(user.toJSON(),config.secrect,{
             expiresIn:"24h"
          });
        
        res.json({
          sucess : true,
          token:'jwt'+' '+ token,
          user:{
            Id:user._id,
            username:user.username
          }
        });
      }
      else
        return res.json({success:false,msg:"wrong"});
      
      });
    });
});

// Here use passport authentication to give sequrity to profile of user
//passport.authenticate('jwt',{session:false})
//  router.get('/profile',passport.authenticate('jwt',{session:false}),(req, res, next) => {
//     res.send('PROFILE');
//  });
module.exports = router;