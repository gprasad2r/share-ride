const mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
	comment :{
		type:String,
		required:true
	},
	username:{
		type:String
	}
});

module.exports = mongoose.model("Comment",commentSchema);