var mongoose = require('mongoose');

var dishes = new mongoose.Schema({	
	type: {type: String}	
});

var seats = new mongoose.Schema({	
	seat: {type: String}	
});

var subcategorySchema = new mongoose.Schema({
        category_id : { type: String, required: '{PATH} is required!'},
	category: { type: String, required: '{PATH} is required!'},
	category_name: { type: String, required: '{PATH} is required!'},
	address: { type: String },
        loc :  { type: {type:String}, coordinates: [Number]},
        city : { type: String },
	dishes : [ dishes ],
        seats : [ seats ],
        start_date: {type: Date}, 
        end_date: {type: Date},
        start_time: {type: Number},
        end_time: {type: Number},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }        
});
subcategorySchema.index({loc: '2dsphere'});
subcategorySchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Subcategory', subcategorySchema);