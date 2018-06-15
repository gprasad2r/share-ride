const express = require('express');
const router = express.Router();
const Ride =require("./../models/ride");


router.get("/home/profile",isloggedin,function(req,res){
    Ride.find({username:req.user.username},function(err,data){
    	if(err){
        	console.log(err);
        	}
        	else{
        		var profileData = data;
        		res.render("profile",{rides:profileData});
        		}
        	});
        	
        });

 router.post("/home/profile",function(req,res){
        		upload(req,res,function(err){
        			if(err){
        				res.render("profile",{msg:err});
        			}else{

						console.log(req.file);
        				res.render("profile",{imgsource:"upload/"+req.file.filename});
        				// imgpath = "upload/"+req.file.filename;
        				// var profile = new Profile;
        				// profile.image.data =fs.readFile(imgpath);
        				// profile.save(function(err,profile){
        				// 	if(err) throw err;
        				// })
         			// 	Profile.findById(profile,function(err,data){
        				// 	if(err) return err;
        				// 	else{
        				// 		res.render("profile",{imgsource:"upload/"+req.file.filename});
        				// 	}
        				// });
        			
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


module.exports = router;