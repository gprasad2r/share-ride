const express= require('express');
const router = express.Router();

    var Ride =require("./../models/ride");

    router.get("/home/:id/comments/new",function(req,res){

    	Ride.findById(req.params.id).exec(function(err,ride){
    		if(err) throw err;
    		else
    			res.render("comment",{ride:ride,title:'form validation',success:false,errors:req.session.errors});
    	        req.session.errors = null;
        });
    });

    module.exports = router;