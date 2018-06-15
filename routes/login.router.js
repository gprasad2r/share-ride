const express = require('express');
const router = express.Router();
  var passport = require("passport");
  
    router.get("/home/login",function(req,res){
    	res.render("login");
    });

    router.post("/home/login",passport.authenticate("local",{
    	successRedirect:"/home",
    	failureRedirect:"/home/login",
    }),function(req,res){


    });

    module.exports = router;
