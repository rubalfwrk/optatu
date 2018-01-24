var mongoose = require('mongoose');

var dishes = new mongoose.Schema({	
	type: {type: String}	
});

var subcategorySchema = new mongoose.Schema({
    category_id : { type: String, required: '{PATH} is required!'},
	category: { type: String, required: '{PATH} is required!'},
	category_name: { type: String, required: '{PATH} is required!'},
	distance: { type: String, required: '{PATH} is required!'},
	address: { type: String },
        latitude: { type: String },
        longitude: { type: String },
        city : { type: String },
	dishes : [ dishes ],
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
            
});

subcategorySchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Subcategory', subcategorySchema);