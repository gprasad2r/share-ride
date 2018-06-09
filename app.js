    var express      = require("express");
    var	app 		 = express();
    var bodyParser   = require("body-parser");
    var	mongoose 	 = require("mongoose");
    var passport = require("passport");
    var localStrategy =require("passport-local");
    var session =require("express-session");
    var expressValidator = require('express-validator');
    var multer = require('multer');
    var path = require('path');
    // var connectMongo = require("connect-mongo");
    var User = require("./models/user");
    var Ride =require("./models/ride");
    const Comment = require('./models/comment');
    const Prifle = require('./models/profile');
    const port =process.env.PORT || 3000;

    mongoose.connect('mongodb://localhost/share_car');

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

    // home page
    app.get("/home",function(req,res){
    	Ride.find({},function(err,allrides){
    		if(err){
    			console.log(err);
    		}
    		else{
    			res.render("home",{rides:allrides});
    		}
    	});    	
    }); 
    // ride page
    app.post("/home",isloggedin,function(req,res){
    	var rides={
    			startingpoint:req.body.startingpoint,
    			endingpoint:req.body.endingpoint,
    			ridedate:req.body.ridedate,
    			availableseats:req.body.availableseats,
    			prefference:req.body.prefference,
    			carmodel:req.body.carmodel,
    			luggagespace:req.body.luggagespace,
    			doors:req.body.doors,
    			aircondition:req.body.aircondition,
                username:req.user.username
    		}; 
    		Ride.create(rides,function(err,ride){
    			if(err){
    				console.log(err);
    			}
    			else{
    				// Ride.users.push(currentUser.id);

    				res.redirect("/home");
    			}
    		});
    		
    });

    // each ride info
    	//profile page
        app.get("/home/profile",isloggedin,function(req,res){
        	Ride.find({username:req.user.username},function(err,data){
        			if(err){
        				console.log(err);
        			}
        			else{
        				var profileData = data;
        				res.render("profile",{rides:profileData});
        			}
        	});
        	
        });

        app.post("/home/profile",function(req,res){
        		upload(req,res,function(err){
        			if(err){
        				res.render("profile",{msg:err});
        			}else{

						console.log(req.file);
        				res.render("profile",{imgsource:"upload/"+req.file.filename});
        				// imgpath = "upload/"+req.file.filename;
        				// var profile = new Profile;
        				// profile.image.data =fs.readFile(imgpath);
        				// profile.save(function(err,profile){
        				// 	if(err) throw err;
        				// })
         			// 	Profile.findById(profile,function(err,data){
        				// 	if(err) return err;
        				// 	else{
        				// 		res.render("profile",{imgsource:"upload/"+req.file.filename});
        				// 	}
        				// });
        			
        			}
        		});
        });

       app.get("/home/profile/:id",function(req,res){
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

    // registration page
    app.get("/home/registration",function(req,res){
    	res.render("registration");
    });

    app.post('/home/registration',function(req,res){
    	User.register(new User({
    		name:req.body.fullname,
    		username:req.body.username,
    		gender:req.body.gender
    	}),req.body.password,function(err,user){
    		if(err){
    		  if("UserExistsError" === err.name){
    			var msgerr = err.name;
    			var message = err.message;
    			res.render("error", { msg :message});

    		  }
    		}
    	else{
    		passport.authenticate("local")(req,res,function(){
    			res.redirect("/home");

    		});
    	}
    });

    });


    // login page
    app.get("/home/login",function(req,res){
    	res.render("login");
    });

    app.post("/home/login",passport.authenticate("local",{
    	successRedirect:"/home",
    	failureRedirect:"/home/login",
    }),function(req,res){


    });


    // logout api
    app.get('/home/logout',function(req,res){
    	req.logout();
    	res.redirect("/home");
    });

    app.get("/home/:id",function(req,res){

    	var id = req.params.id;
    		Ride.findById(id).populate("comments").exec(function(err,ride){
    			if(err){
    				console.log(err);
    			}
    			else{
    				res.render("singleride",{ride:ride});							}
    		});
    });

    // comments

    app.get("/home/:id/comments/new",function(req,res){

    	Ride.findById(req.params.id).exec(function(err,ride){
    		if(err) throw err;
    		else
    			res.render("comment",{ride:ride,title:'form validation',success:false,errors:req.session.errors});
    	        req.session.errors = null;
        });
    });

    app.post("/home/:id/comments",isloggedin,function(req,res){
    	Ride.findById(req.params.id).exec(function(err,ride){
    		if(err){
                
                console.log(err.msg);
            }
    
    		 else{
      //           req.check('comment','enter something').isLength({min:1});
      //           var errors = req.validationErrors();
      //           if(errors){
      //               req.session.errors = errors;
      //                res.redirect("/home/"+req.params.id+"/comments/new");
      //           }
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
