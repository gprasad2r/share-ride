const express= require('express'),
	 router = express.Router(),
    	 Ride =require("./../models/ride"),
	 Comment = require('./../models/comment'),
	 isloggedin = require('./middleware/isloggedin');

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

module.exports = router;