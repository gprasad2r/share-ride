
const express = require('express');
const router = express.Router();
const Ride =require("./../models/ride");


       router.get("/home/profile/:id",function(req,res){
       		Ride.findByIdAndDelete(req.params.id).exec(function(err,data){
       				if(err){
       					console.log(err);
       				}
       				else{
       					res.redirect("/home/profile");
       				}
       		});
       		// res.send(req.params.id);
    });

       module.exports = router;