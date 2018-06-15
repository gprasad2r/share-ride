const express= require('express');
const router = express.Router();

    var Ride =require("./../models/ride");

    router.get("/home/:id",function(req,res){

    	var id = req.params.id;
    		Ride.findById(id).populate("comments").exec(function(err,ride){
    			if(err){
    				console.log(err);
    			}
    			else{
    				res.render("singleride",{ride:ride});							}
    		});
    });

    module.exports = router;