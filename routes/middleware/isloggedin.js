module.exports = function isloggedin(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect("/home/login");
    }
}
