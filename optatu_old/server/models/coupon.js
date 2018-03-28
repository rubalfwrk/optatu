var mongoose = require('mongoose'),
passportLocalMongoose = require('passport-local-mongoose');
//var bcrypt = require('bcrypt-nodejs');

var couponSchema = new mongoose.Schema({
        subcategoryid:{type: mongoose.Schema.Types.ObjectId, required: '{PATH} is required!'}, 
        res_type:{type:String},
        price:{type:String},
        percentage:{type:String},
        startdate:{type: Date},
        enddate:{type: Date}       
});

// Passport-Local-Mongoose will add a username, 
// hash and salt field to store the username, 
// the hashed password and the salt value

couponSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Coupon', couponSchema);/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */