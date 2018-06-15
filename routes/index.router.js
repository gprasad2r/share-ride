 const express = require('express');
const router = express.Router();
// const isloggedin = require('./../app');
 router.get('/',function(req,res){
        res.redirect("/home");
    });

    module.exports = router;