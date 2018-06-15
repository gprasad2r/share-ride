const express= require('express');
const router = express.Router();
    var Ride =require("./../models/ride");
    const Comment = require('./../models/comment');
    router.post("/home/:id/comments",isloggedin,function(req,res){
    	Ride.findById(req.params.id).exec(function(err,ride){
    		if(err){
                
                console.log(err.msg);
            }
    
    		 else{
                var commentData ={
                    comment :req.body.comment,
                    username:req.user.username
                };

    			Comment.create(commentData,function(err,commentData){
		         if(err) {
		        	if (err.name == 'ValidationError') {
		            for (field in err.errors) {
		            	var message = err.errors[field].message;
		            	// res.send(msg);
		               res.redirect("/home/"+req.params.id+"/comments/new");
		            }
		        }
		       }
        		else{
        			ride.comments.push(commentData);
        			ride.save();
        			res.redirect("/home/"+req.params.id);
        		  }
        	   });//creating comment data with mongo
               }// ride-else
             });//finding Ride data statement
         }); //post api

     // middleware
  function isloggedin(req,res,next){
    	if(req.isAuthenticated()){
    		return next();
    	}
    	else{
    		res.redirect("/home/login");
    	}
    }

    module.exports = router;