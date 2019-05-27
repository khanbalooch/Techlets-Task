var express = require('express');
var router = express.Router();
var User = require('../models/User');
var mongoose = require('mongoose');
var passport = require('passport');
require('../config/passport')(passport);
var config = require('../config/database');
var jwt = require('jsonwebtoken');
var findLcs = require('longest-common-subsequence');
var Lcs = require('../models/LongestCommonSubsequence');

//============================================================
router.get('/getlcs/:id', passport.authenticate('jwt', {session: false }), function(req, res){
  console.log('getlcs');
  var jwt = this.extractJwt(req.headers);

  if(jwt){
      Lcs.find({user:req.params.id}, function(error, lcs){
          if(error){
              console.log('Unable to find LCS');
              return res.json({success: false, msg:'LCS read Failure'});
          }else{
              console.log('LCS' + lcs);
              return res.json(lcs);
          }
      });
  }else{
      return res.status(403).send({success: false, msg: 'Unauthorized User'});
  }
});
//===========================Add User=================================
router.post('/addUser', function(req, res){
    console.log('add user request');
    if(!req.body.email ||  !req.body.password){// check for the password and username/email address
        res.json({success:false, msg: 'please add user name and passowrd'});
    }else{
        var user = new User({
            email: req.body.email,
            password: req.body.password
        });

        user.save(function(error){
            if(error){
                console.log('user already exist');
                return res.json({success: false, msg: 'User Already Exists'});
            }else{
                console.log('New user added ');
                res.json({success: true, msg: 'user created successfully'});
            }
        });
    }

});

//==============================login==============================
router.post('/login', function(req, res){

    User.findOne({email:req.body.email}, function(error,user){

        if(error){
            //Error Occured throw exception or handle exception
        }
        if(!user){
            console.log('login unsuccessful');
            res.status(401).send({success:false, msg: 'User Not Found'});// User Not Exits
        }else{
            user.validatePassword(req.body.password, function(error, isMatch){
                console.log(user._id);
                if(isMatch && !error){  // user found + no error occured + password also correct
                    var token = jwt.sign(user.toJSON(), config.secret);
                    console.log('login successful');
                    res.send({success: true, user_id:user._id , token: 'JWT '+ token});
                }else{                  // passowrd mismatch
                    console.log('login unsuccessful');
                    res.status(401).send({success: false, msg:'Authenticaion failure'});
                }
            });
        }

    });
});

//=========================LCS===================================
router.post('/findlcs', function(req, res){
    console.log('find lcss');
    var result = findLcs(req.body.string1,req.body.string2);
    console.log(result)
    res.send({success:true, lcs:result});
});
//==========================Save LCS==================================
router.post('/savelcs', passport.authenticate('jwt', {session: false })  , function(req,res){
    console.log('savelcs');
    var jwt = this.extractJwt(req.headers);
    console.log('jwt:' + jwt);
    console.log('req.headers:' + req.headers);
     if(jwt){
         var lcs = new Lcs({
             lcs: req.body.lcs,
             string1: req.body.string1,
             string2: req.body.string2,
             user: req.body.user
         });

         lcs.save(function(error){
             if(error){
                return res.json({success: false, msg:'LCS save Failure'});// unable to save in mongo
             }
             return res.json({success: true, msg:'LCS Save Succesfully'});// saved
         });
     }else{// if jwt not found | user not authorized to do so
            return res.status(403).send({success: false, msg: 'Unauthorized User'});
     }
});
//============================================================
extractJwt = function(userHeaders){
    console.log('user Header:' + userHeaders);

    if(userHeaders && userHeaders.authorization){
        var tokenized = userHeaders.authorization.split(' ');
        console.log('tokenized:' + tokenized);
        if(tokenized.length === 2){
            return tokenized[1];
        }else{
            return null;
        }

    }else{//NO authroization avalaible
        console.log('No Authorization token present')
        return null;
    }
};

//============================================================
module.exports = router;
