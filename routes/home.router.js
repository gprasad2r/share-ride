 const express = require('express');
const router = express.Router();
var Ride =require("./../models/ride");

// home page
    router.get("/home",function(req,res){
    	Ride.find({},function(err,allrides){
    		if(err){
    			console.log(err);
    		}
    		else{
    			res.render("home",{rides:allrides});
    		}
    	});    	
    }); 
    // ride page
    router.post("/home",isloggedin,function(req,res){
    	var rides={
    			startingpoint:req.body.startingpoint,
    			endingpoint:req.body.endingpoint,
    			ridedate:req.body.ridedate,
    			availableseats:req.body.availableseats,
    			prefference:req.body.prefference,
    			carmodel:req.body.carmodel,
    			luggagespace:req.body.luggagespace,
    			doors:req.body.doors,
    			aircondition:req.body.aircondition,
                username:req.user.username
    		}; 
    		Ride.create(rides,function(err,ride){
    			if(err){
    				console.log(err);
    			}
    			else{
    				res.redirect("/home");
    			}
    		});
    		
    });

     function isloggedin(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        else{
            res.redirect("/home/login");
        }
    }


module.exports = router