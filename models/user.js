var mongoose =require("mongoose");
passportLocalMongoose = require("passport-local-mongoose");
var userSchema = new mongoose.Schema({
	name:{type:String},
	username:{type:String,unique:true},
	password:{type:String},
	gender:String
	
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",userSchema);

// var query = {'name' :'prasad'}

// User.findOneAndUpdate(query,{'email':'gprasad2r@gmail.com'},{upsert:true},function(err,user){});