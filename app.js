     const express      = require("express");
    const	app 		 = express();
    var bodyParser   = require("body-parser");
    var	mongoose 	 = require("mongoose");
    var passport = require("passport");
    var localStrategy =require("passport-local");
    var session =require("express-session");
    var expressValidator = require('express-validator');
    var multer = require('multer');
    var path = require('path');
    var index = require('./routes/index.router');
    var home = require('./routes/home.router');
    var profile = require('./routes/profile.router');
    var profileId = require('./routes/profile.id');
    var registration = require('./routes/registration.route');
    var login = require('./routes/login.router');
    var logout = require('./routes/logout.router');
    var singleRide = require('./routes/singleRide.router');
    var newComment = require('./routes/newComment.router');
    var allcomments = require('./routes/allcomments.router');
    var User = require("./models/user");
    var Ride =require("./models/ride");
    const Comment = require('./models/comment');
   
    const port =process.env.PORT || 3000;

    mongoose.connect('mongodb://localhost/share_car'||'mongodb://prasad:prasad2@ds119014.mlab.com:19014/node-db-proj');

    const storage = multer.diskStorage({
    	destination:'./public/upload',
    	filename:function(req,file,cb){
    		cb(null,file.fieldname+'-'+Date.now()+
    			path.extname(file.originalname));
    	} 
    });

    const upload = multer({
    	storage:storage
    }).single('fileimage');

    app.set("view engine","ejs");
	
	app.use(bodyParser.urlencoded({exrend:true}));
    app.use(expressValidator());
    app.use(express.static(__dirname +'/public'));
    app.use(session({
            secret:"rusty",
            resave:false,
            saveUninitializedg:false
        }));
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new localStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    app.use(function(req, res, next){
    	res.locals.currentUser = req.user;
    	next();
    });

   
       
    app.use('/', index);
    app.all('/home', home);
    app.all('/home/profile', profile);
    app.all('/home/profile/:id', profileId);
    app.all('/home/registration', registration);
    app.all('/home/login', login);
    app.all('/home/logout', logout);
    app.all('/home/:id', singleRide);
    app.get('/home/:id/comments/new', newComment);
    app.post('/home/:id/comments', allcomments);

  


    // comments

   
  
        
    // middleware
  function isloggedin(req,res,next){
    	if(req.isAuthenticated()){
    		return next();
    	}
    	else{
    		res.redirect("/home/login");
    	}
    }

    //server to start 
    app.listen(port,function(){
    	console.log("server has started...");
    });
