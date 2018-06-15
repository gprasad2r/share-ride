const express = require('express');
const router = express.Router();
const Ride =require("./../models/ride");
    var User = require("./../models/user");

 router.get("/home/registration",function(req,res){
    	res.render("registration");
    });

    router.post('/home/registration',function(req,res){
    	User.register(new User({
    		name:req.body.fullname,
    		username:req.body.username,
    		gender:req.body.gender
    	}),req.body.password,function(err,user){
    		if(err){
    		  if("UserExistsError" === err.name){
    			var msgerr = err.name;
    			var message = err.message;
    			res.render("error", { msg :message});

    		  }
    		}
    	else{
    		passport.authenticate("local")(req,res,function(){
    			res.redirect("/home");

    		});
    	}
    });

    });

    module.exports = router;