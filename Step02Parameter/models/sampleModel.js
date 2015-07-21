var mongoose = require('mongoose');

var sampleSchema = mongoose.Schema({
	"sampleField":String
});

module.exports = mongoose.model('Sample', sampleSchema);