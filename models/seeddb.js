var mongoose = require("mongoose");
var Campground = require("./ride");
var Comment = require("./comment");

var data = [
	{
		desination:"mounsasta",
		
	},
	{
		desination:"mounsasta",
		
	},
	{
		desination:"mounsasta",
		
	}
];


function seedDB(){
	Ride.remove({},function(err){
		if(err){
			console.log(err);
		}
		console.log("remove campground");
	data.forEach(function(seed){
	Ride.create(seed,function(err,ride){
		if(err){
			console.log(err);
		}
		else{
			console.log("added campground");
			Comment.create({
				req.body.comment
			},function(err,comment){
				if(err){
					console.log(err);
					}else
				{
					ride.comments.push(comment);
					ride.save();
					console.log("comments created");
				}			
			});
		}
	});
	});
		
	});

}

	module.exports = seedDB;