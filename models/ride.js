var mongoose =require("mongoose");

var rideSchema = new mongoose.Schema({
	startingpoint :{
					type:String
					},
	endingpoint:{
				type:String
				},
	ridedate:{
			type:Date,

			},
	created:{
			type:Date,
			default:Date.now
		},
	availableseats:{
			type:String
		},
	prefference:{
			type:String
		},
	carmodel:{
			type:String
		},
	luggagespace:{
			type:String
		},
	doors:{
			type:String
		},
	aircondition:{
			type:String
	},
	comments:[
	{
			type:mongoose.Schema.Types.ObjectId,
			ref:'Comment'
	}],
	//looged in username
	username:{
		type:String
	}

	});

module.exports = mongoose.model("Ride",rideSchema);