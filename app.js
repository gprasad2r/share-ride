    const express      = require("express"),
        	app 	   = express(),
          bodyParser   = require("body-parser"),
    	mongoose 	 = require("mongoose"),
        passport = require("passport"),
     localStrategy =require("passport-local"),
     session =require("express-session"),
     expressValidator = require('express-validator'),
     multer = require('multer'),
     path = require('path'),
     index = require('./routes/index.router'),
     home = require('./routes/home.router'),
     profile = require('./routes/profile.router'),
     profileId = require('./routes/profile.id'),
     registration = require('./routes/registration.route'),
     login = require('./routes/login.router'),
     logout = require('./routes/logout.router'),
     singleRide = require('./routes/singleRide.router'),
     newComment = require('./routes/newComment.router'),
     allcomments = require('./routes/allcomments.router'),
     User = require("./models/user");
   
    const port =process.env.PORT || 3000;

    mongoose.connect('mongodb://prasad:prasad2@ds119014.mlab.com:19014/node-db-proj');
// 'mongodb://localhost/share_car'||
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

    //routers
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
