
const express= require('express');
const router = express.Router();
    router.get('/home/logout',function(req,res){
    	req.logout();
    	res.redirect("/home");
    });

    module.exports = router;