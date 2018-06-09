var mongoose = require('mongoose');

var profileSchema=mongoose.Schema({
	image:{
		data:Buffer
	}
});

module.exports = mongoose.model("Profile",profileSchema);