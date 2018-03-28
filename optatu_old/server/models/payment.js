var mongoose = require('mongoose');

var paymentSchema = new mongoose.Schema({
	transactionid: { type: String},
        price : { type: String },   
        image : { type: String },
        subcategoryid : { type: String },
        userid : { type: String },
        paymentmethod : { type: String },
        category : { type: String },       
        category_name : { type: String }, 
        date_time : { type: Date },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }          
});

paymentSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Payment', paymentSchema);