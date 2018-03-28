/**
 * @author harman
 * @description movie
 * @type type
 */

var Subcategory = require('../models/subcategory');
// Posts API
var mongoose = require('mongoose');
module.exports = function(apiRouter,s3,randomString,userupload){
	
	apiRouter.get('/subcategory/categorylist', function(req, res){
		Subcategory.find({}, function(err, posts){
                    console.log(posts);
			if (err) res.send(err);

			res.json({error : 0 , data : posts});
		}).sort({ created_at : -1 });
	});
	
        //delete subcategory
	apiRouter.post('/subcategory/delete', function(req, res){
                console.log(req.body);
		Subcategory.remove({
			_id: req.body.id
		}, function(err, post){
			if(err) res.send(err);

			res.json({ message: 'Post deleted!' });
		});
	});
        

	//subcat by id
        apiRouter.post('/subcategory/subcategorybyid', function(req, res){
        console.log(req.body.id);
            Subcategory.find({_id : req.body.id}, function(err, post){
                console.log(post);
                    if (err) res.send(err);

                    res.json({error : 0 , subcatlist : post});
            });
	});
        
        // subcategory/editparmal
        apiRouter.post('/subcategory/editparmal', function(req, res) {
        console.log(req.body);
        
        Subcategory.findById({'_id': req.body.id}, function(err, user) {
            
            if (err){
                res.send(err);
            }else{
            user.category = req.body.cat;
            user.subcategory = req.body.subcat;
            user.save(function(err) {
                if (err){
                    res.send({"error" : 1,"message" : "Unable to edit user"});
                }else{
                res.json({"error":0,"message":'Your Account Has been updated successfully','data':user});
                }
                })
            }
            });
        });
    
    /* Rubal api's */
    /* Add subcategories */
    apiRouter.post('/addsubcategories', function(req, res){
      
                var subcategories = new Subcategory();
                var img = req.body.image;
                buf = new Buffer(img.replace(/^data:image\/\w+;base64,/, ""),'base64');
                //console.log(buf);
                var data = {
                  Body: buf,
                  ContentEncoding: 'base64',
                  ContentType: 'image/jpeg'
                };
                s3.putObject(data, function(err, data){
                var pro_pic = "https://s3.us-east-2.amazonaws.com/optatu/"+randomString+".jpg";

                subcategories.category_id = req.body.category_id;               
                subcategories.image = pro_pic;               
                subcategories.location_type = req.body.location_type;
                subcategories.category = req.body.category;
                subcategories.category_name = req.body.category_name;
                subcategories.address = req.body.address;  
                subcategories.start_date = req.body.start_date;  
                subcategories.end_date = req.body.end_date;  
                subcategories.start_time = Number(req.body.start_time);  
                subcategories.end_time = Number(req.body.end_time);  
                subcategories.loc =  { type: "Point", coordinates: [req.body.longitude, req.body.latitude]};  
                var str = req.body.type;
                var $arr = str.split(",");
                var str1 = req.body.menu_type;
                var $arr1 = str1.split(",");
                var str2 = req.body.menu_price;
                var $arr2 = str2.split(",");
                var seatstr = req.body.seat;
                var seatarr = seatstr.split(",");

                var obj = [];

                for(var i=0,len=$arr.length; i < len ;i++) {
                    subcategories.dishes.push({'menu_type':$arr1[i],'type':$arr[i],'menu_price':$arr2[i]});
                }

                seatarr.forEach(function(element){
                    subcategories.seats.push({'seat':element});
                });

                subcategories.save(function(err, subcategories){
                if(err) res.send(err);

                res.send({error : 0 , SubCategory : subcategories , message: 'Subcategory Added!'});
                });	
                });
    });
    
    /* Get list of subcategories on the basic of id's */
    apiRouter.post('/subcatbyid', function(req, res){
            console.log(req.body.category_id);
		Subcategory.aggregate([
                    {
                        $lookup:{  
                            localField: "_id",   
                            from: "coupons",         
                            foreignField: "subcategoryid",  
                            as: "coupon"  
                        }
                    }, 
                    {
                        "$unwind":"$coupon"
                    },
                    {
                        $match:{
                        category_id : req.body.category_id,
                        address: { '$regex': '.*' + req.body.address+ '.*', $options: 'i' } 
                        }
                    }
                ], function(err, post){
                    console.log(post);
			if (err) res.send(err);

			res.json({error : 0 , subcatlist : post});
		});
	});
	
	apiRouter.post('/subcatbyaddress', function(req, res){
        
		 Subcategory.aggregate( [ 
                     {
                        $lookup:{  
                            localField: "_id",   
                            from: "coupons",         
                            foreignField: "subcategoryid",  
                            as: "coupon"  
                        }
                    },
                    {
                        $match:{
                            address: { '$regex': '.*' + req.body.address+ '.*', $options: 'i' }
                        }
                    }
                 ] , function(err, post){
                        if (err) res.send(err);
			res.json({error : 0 , subcatlist : post});
		});
	});
	
	apiRouter.post('/subcatbysearchvalues', function(req, res){
        
            var finalarray =[] ;
                    if( req.body.seats!=""){
                        finalarray.push({  
                            seats: {
                                $elemMatch: { seat: req.body.seats }
                            }                        
                    });
                        
                    }
                    
                    if( req.body.time!=""){
                        finalarray.push({  
                            start_time: {"$lte": Number(req.body.time) } , 
                            end_time: {"$gte": Number(req.body.time) }
			});
                    }
                    
                    if( req.body.date!=""){
                        finalarray.push({  
                            start_date: {"$lte": new Date(req.body.date) } , 
                            end_date: {"$gte": new Date(req.body.date) }                       
			});
                    }
                    
                    if( req.body.category!=""){
                        finalarray.push({  
                            category: { 
                                    '$regex': '.*' + req.body.category + '.*', $options: 'i' 
                                }                          
			});
                    }
                    
                    if( req.body.address!=""){
                        finalarray.push({  
                            address: { 
                                    '$regex': '.*' + req.body.address + '.*', $options: 'i' 
                                }                          
			});
                    }
                    
                    
		Subcategory.aggregate( 
                        {
                            "$lookup":{  
                                "localField": "_id",   
                                "from": "coupons",         
                                "foreignField": "subcategoryid",  
                                "as": "coupon"  
                            }
                        }, 
                        {
                            "$unwind":"$coupon"
                        },
                        {"$match":{"$and": finalarray
                    } }, function(err, post){       
			if (err){ res.send(err)}
                        else if(req.body == ""){
                            res.send({error : 1 , msg : "Please select atleast one creteria."});  
                        }else{
			res.json({error : 0 , subcatlist : post});
                    }
		});
	});
        
        
       
        apiRouter.post('/sortbydistance', function(req, res) {  
            
            if(req.body.param=="distance"){
                    var finalarray = [        
                    {   
                        "$geoNear": {
                            "near": { 
                                "type": "Point", 
                                "coordinates": [Number(req.body.longitude),Number(req.body.latitude)]
                            },
                            "distanceField": "distance",
                            "maxDistance": Number(req.body.distance), 
                            "minDistance": 0,
                            "spherical": true
                        }
                    },
                    {   
                        "$lookup": {  
                            "localField": "_id",   
                            "from": "coupons",         
                            "foreignField": "subcategoryid",  
                            "as": "coupon"  
                        }           
                    },
                    {
                        "$sort" : {
                            "distance" : 1 ,
                        }
                    }];
                   
                }else if(req.body.param=="endvalidity"){
                    
                    var finalarray = [
                            {   
                                "$lookup": {  
                                    "localField": "_id",   
                                    "from": "coupons",         
                                    "foreignField": "subcategoryid", 
                                    "as": "coupon"
                                }
                            }, 
                            {
                                "$unwind":"$coupon"
                            },
                    {
                        "$sort" : {
                            "end_time" : 1 ,
                        }
                    }
                    ];    
                }else{
                    var finalarray = [        
                        {   
                            "$geoNear": {
                                "near": { 
                                    "type": "Point", 
                                    "coordinates": [Number(req.body.longitude),Number(req.body.latitude)]
                                },
                                "distanceField": "distance",
                                "maxDistance": Number(req.body.distance), 
                                "minDistance": 0,
                                "spherical": true
                            }
                        },
                        {   
                            "$lookup": {  
                                    "localField": "_id",   
                                    "from": "coupons",         
                                    "foreignField": "subcategoryid", 
                                    "as": "coupon"
                            }         
                        },
                        {
                                "$unwind":"$coupon"
                        },
                        {
                        "$sort" : {
                            "distance" : 1 ,
                        }
                    }
                ] ;
                }   
            
                    if( req.body.time!=""){
                        finalarray.push(
                            {
                                "$match": {  
                                        start_time: {"$lte": Number(req.body.time) } , 
                                        end_time: {"$gte": Number(req.body.time) }
                                }
			});
                    }
                    
                    if( req.body.subcat_date!=""){
                        finalarray.push({ 
                            "$match": {
                            start_date: {"$lte": new Date(req.body.subcat_date) } , 
                            end_date: {"$gte": new Date(req.body.subcat_date) }                       
                        }});
                    }
                    
                    if( req.body.category!=""){
                        finalarray.push({ 
                            "$match": {
                            category: { 
                                    '$regex': '.*' + req.body.category + '.*', $options: 'i' 
                                }                          
			}});
                    }
                    
                    if( req.body.address!=""){
                        finalarray.push({
                            "$match": {
                            address: { 
                                    '$regex': '.*' + req.body.address + '.*', $options: 'i' 
                                }                          
			}});
                    }
                    
                    if( req.body.seats!=""){
                        finalarray.push({ 
                            "$match": {
                            seats: {
                                $elemMatch: { seat: req.body.seats }
                            }                        
                    }});
                        
                    }
                    
                    if( req.body.res_type!=""){
                        finalarray.push({                             
                              "$match":{"coupon.res_type": {'$regex': '.*' + req.body.res_type + '.*', $options: 'i' }}
                        });
                        
                    }
                    
                    if( req.body.menu_type!=""){
                        finalarray.push({
                            "$match":{
                                    dishes: {
                                    $elemMatch: { menu_type: {'$regex': '.*' + req.body.menu_type + '.*', $options: 'i' }}
                                    }
                            }
                        });    
                    }
                    
                    if( req.body.min_menu_price!=""){
                        finalarray.push({
                            "$match":{
                                dishes: {
                                $elemMatch: {"menu_price": {"$gte": req.body.min_menu_price,"$lte": req.body.max_menu_price}}
                                }
                            }
                    });   
                    }
                    
                    if( req.body.location_type!=""){
                        finalarray.push({  
                            "$match":{
                                location_type: {'$regex': '.*' + req.body.location_type + '.*', $options: 'i'}   
                            }
                    });
                        
                    }
            
            Subcategory.aggregate(finalarray,
                    function(err, subcategory) {
                        if (err) {   
                            return res.send({ 'data': err, 'error': 1 });   
                        }   
                        if (subcategory.length != 0) {   
                            return res.send({ 'data': subcategory, 'error':0}); 
                        } else {   
                            return res.send({'error':2, 'msg': 'No data found' });   
                        } 
                    }); 
        });
        
        
        apiRouter.post('/subcategory/filters', function(req, res){
            console.log(new Date(req.body.date));
            var finalarray =[] ;
            
                if(req.body.param=="distance"){
                    var finalarray = [        
                    {   
                        "$geoNear": {
                            "near": { 
                                "type": "Point", 
                                "coordinates": [Number(req.body.longitude),Number(req.body.latitude)]
                            },
                            "distanceField": "distance",
                            "maxDistance": Number(req.body.distance), 
                            "minDistance": 0,
                            "spherical": true
                        }
                    },
                    {   
                        "$lookup": {  
                            "localField": "_id",   
                            "from": "coupons",         
                            "foreignField": "subcategoryid",  
                            "as": "coupon"  
                        }           
                    }];
                   
                }else if(req.body.param=="endvalidity"){
                    
                    var finalarray = [
                            {   
                                "$lookup": {  
                                    "localField": "_id",   
                                    "from": "coupons",         
                                    "foreignField": "subcategoryid", 
                                    "as": "coupon"
                                }
                            }, 
                            {
                                "$unwind":"$coupon"
                            }
                    ];    
                }else{
                    var finalarray = [        
                        {   
                            "$geoNear": {
                                "near": { 
                                    "type": "Point", 
                                    "coordinates": [Number(req.body.longitude),Number(req.body.latitude)]
                                },
                                "distanceField": "distance",
                                "maxDistance": Number(req.body.distance), 
                                "minDistance": 0,
                                "spherical": true
                            }
                        },
                        {   
                            "$lookup": {  
                                    "localField": "_id",   
                                    "from": "coupons",         
                                    "foreignField": "subcategoryid", 
                                    "as": "coupon"
                            }         
                        },
                        {
                                "$unwind":"$coupon"
                        }
//                        ,
//                        {   
//                            "$match": {
//                                    "coupon.enddate": {"$gte": new Date(req.body.date)}
//                            }
//                        }
                    ] ;
              }   
             
                    if( req.body.time!=""){
                        finalarray.push(
                            {
                                "$match": {  
                                        start_time: {"$lte": Number(req.body.time) } , 
                                        end_time: {"$gte": Number(req.body.time) }
                                }
			});
                    }
                    
                    if( req.body.subcat_date!=""){
                        finalarray.push({ 
                            "$match": {
                            start_date: {"$lte": new Date(req.body.subcat_date) } , 
                            end_date: {"$gte": new Date(req.body.subcat_date) }                       
                        }});
                    }
                    
                    if( req.body.category!=""){
                        finalarray.push({ 
                            "$match": {
                            category: { 
                                    '$regex': '.*' + req.body.category + '.*', $options: 'i' 
                                }                          
			}});
                    }
                    
                    if( req.body.address!=""){
                        finalarray.push({
                            "$match": {
                            address: { 
                                    '$regex': '.*' + req.body.address + '.*', $options: 'i' 
                                }                          
			}});
                    }
                    
                    if( req.body.seats!=""){
                        finalarray.push({ 
                            "$match": {
                            seats: {
                                $elemMatch: { seat: req.body.seats }
                            }                        
                    }});
                        
                    }
                    
                    
                    if( req.body.res_type!=""){
                        finalarray.push({                             
                              "$match":{"coupon.res_type": {'$regex': '.*' + req.body.res_type + '.*', $options: 'i' }}
                        });
                        
                    }
                    
                    if( req.body.menu_type!=""){
                        finalarray.push({
                            "$match":{
                                    dishes: {
                                    $elemMatch: { menu_type: {'$regex': '.*' + req.body.menu_type + '.*', $options: 'i' }}
                                    }
                            }
                        });    
                    }
                    
                    if( req.body.min_menu_price!=""){
                        finalarray.push({
                            "$match":{
                                dishes: {
                                $elemMatch: {"menu_price": {"$gte": req.body.min_menu_price,"$lte": req.body.max_menu_price}}
                                }
                            }
                    });   
                    }
                    
                    if( req.body.location_type!=""){
                        finalarray.push({  
                            "$match":{
                                location_type: {'$regex': '.*' + req.body.location_type + '.*', $options: 'i'}   
                            }
                    });
                        
                    }
             
                    Subcategory.aggregate(finalarray, 
                        function(err, post){       
			if (err){res.send(err)
                        }else {
                        
			res.json({error : 0 , subcatlist : post});
                    }
		});
	});
        
        apiRouter.post('/subcatbynames', function(req, res){
        
            var finalarray =[] ;
            
                    if( req.body.id!=""){
                        finalarray.push({  
                            '_id': mongoose.Types.ObjectId(req.body.id)                      
                        });   
                    }
                    
                    if( req.body.seats!=""){
                        finalarray.push({  
                             seats: {
                                $elemMatch: { seat: req.body.seats }
                            }                                                
                    });
                        
                    }
                    
                    if( req.body.time!=""){
                        finalarray.push({  
                            start_time: {"$lte": Number(req.body.time) } , 
                            end_time: {"$gte": Number(req.body.time) }
			});
                    }
                    
                    if( req.body.date!=""){
                        finalarray.push({  
                            start_date: {"$lte": new Date(req.body.date) } , 
                            end_date: {"$gte": new Date(req.body.date) }                       
			});
                    }
                    
                     if( req.body.res_type!=""){
                        finalarray.push({                             
                              "coupon.res_type": {'$regex': '.*' + req.body.res_type + '.*', $options: 'i' }
                        });
                        
                    }
                    
                    if( req.body.menu_type!=""){
                        finalarray.push({

                            dishes: {
                            $elemMatch: { menu_type: {'$regex': '.*' + req.body.menu_type + '.*', $options: 'i' }}
                            }
                            
                        });    
                    }
                    
                    if( req.body.min_menu_price!=""){
                        finalarray.push({
                            dishes: {
                                $elemMatch: {"menu_price": {"$gte": req.body.min_menu_price,"$lte": req.body.max_menu_price}}
                            }
                            
                    });   
                    }
                    
                    if( req.body.location_type!=""){
                        finalarray.push({  
                            location_type: {'$regex': '.*' + req.body.location_type + '.*', $options: 'i'}      
                    });
                        
                    }
            
                    console.log(finalarray);
		Subcategory.aggregate( 
                        {
                            "$lookup":{  
                                "localField": "_id",   
                                "from": "coupons",         
                                "foreignField": "subcategoryid",  
                                "as": "coupon"  
                            }
                        }, 
                        {
                            "$unwind":"$coupon"
                        },
                        {"$match":{"$and": finalarray
                    } }, function(err, post){       
			if (err){ res.send(err)}
                        else if(req.body == ""){
                            res.send({error : 1 , msg : "Please select atleast one creteria."});  
                        }else{
			res.json({error : 0 , subcatlist : post});
                    }
		});
	});
        
        
          
          
};