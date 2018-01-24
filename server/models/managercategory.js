var mongoose = require('mongoose');

var managercategorySchema = new mongoose.Schema({
	category: { type: String, required: '{PATH} is required!'},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
            
});

managercategorySchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Managercategory', managercategorySchema);