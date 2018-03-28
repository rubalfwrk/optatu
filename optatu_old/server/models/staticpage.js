var mongoose = require('mongoose');

var staticpageSchema = new mongoose.Schema({
    title : { type: String, required: '{PATH} is required!'} ,
    description : { type: String, required: '{PATH} is required!'}
});

staticpageSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('staticpage', staticpageSchema);