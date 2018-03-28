/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var Coupon = require('../models/coupon');
module.exports = function(apiRouter,passport,transporter,s3,randomString,userupload) {
/* Rubal api's */
    /* Add coupons */
    apiRouter.post('/coupon/addcoupons', function(req, res){
                        console.log(req.body);
                        var coupons = new Coupon();
                        coupons.subcategoryid = req.body.subcategoryid;
                        coupons.res_type = req.body.res_type;
                        coupons.startdate = req.body.startdate;
                        coupons.enddate = req.body.enddate; 
                        coupons.percentage = req.body.percentage;     
                        coupons.price = req.body.price;
			coupons.save(function(err, coupons){
			if(err) { 
                            res.send(err);
                        }else{
			res.send({error : 0 , Coupons : coupons , message: 'Coupons Added!'});
                    }

		});
		
	});


};