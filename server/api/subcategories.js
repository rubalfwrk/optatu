/**
 * @author harman
 * @description movie
 * @type type
 */

var Subcategory = require('../models/subcategory');
// Posts API

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
                        // console.log(typeof(req.body.end_time));
                        subcategories.category_id = req.body.category_id;
                        subcategories.category = req.body.category;
                        subcategories.category_name = req.body.category_name;
                        subcategories.address = req.body.address;  
                        subcategories.start_date = req.body.start_date;  
                        subcategories.end_date = req.body.end_date;  
                        subcategories.start_time = Number(req.body.start_time);  
                        subcategories.end_time = Number(req.body.end_time);  
                        subcategories.loc =  { type: "Point", coordinates: [req.body.longitude, req.body.latitude]};  
                        var str = req.body.type;
                        var arr = str.split(",");
                        var seatstr = req.body.seat;
                        var seatarr = seatstr.split(",");
                                          
                        arr.forEach(function(element){
                            subcategories.dishes.push({'type':element});
                        });
                        
                        seatarr.forEach(function(element){
                            subcategories.seats.push({'seat':element});
                        });
				
			subcategories.save(function(err, subcategories){
			if(err) res.send(err);
			res.send({error : 0 , SubCategory : subcategories , message: 'Subcategory Added!'});
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
                        $match:{
                        category_id : req.body.category_id
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
            console.log(post);       
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
                        {"$match":{  "$and": finalarray
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
                    var queryx = [        
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
                    var queryx = [
                            {   
                                "$lookup": {  
                                    "localField": "_id",   
                                    "from": "coupons",         
                                    "foreignField": "subcategoryid", 
                                    "as": "data"
                                }
                            }, 
                            {
                                "$unwind":"$data"
                            },    
                            {
                                "$match": {
                                    "data.enddate": {"$gte": new Date(),"$lte": new Date(req.body.date)}
                                }
                            }
                    ];    
            }else{
                    var queryx = [        
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
                                    "as": "data"
                            }         
                        },
                        {
                                "$unwind":"$data"
                        },
                        {   
                            "$match": {
                                    "data.enddate": {"$gte": new Date(),"$lte": new Date(req.body.date)}
                                }
                        }] ;
            }
            
            if( req.body.time!=""){
                        queryx.push(
                            {
                                "$match": {  
                                        start_time: {"$lte": Number(req.body.time) } , 
                                        end_time: {"$gte": Number(req.body.time) }
                                }
			});
                    }
                    
                    if( req.body.date!=""){
                        queryx.push({ 
                            "$match": {
                            start_date: {"$lte": new Date(req.body.date) } , 
                            end_date: {"$gte": new Date(req.body.date) }                       
                        }});
                    }
                    
                    if( req.body.category!=""){
                        queryx.push({ 
                            "$match": {
                            category: { 
                                    '$regex': '.*' + req.body.category + '.*', $options: 'i' 
                                }                          
			}});
                    }
                    
                    if( req.body.address!=""){
                        queryx.push({
                            "$match": {
                            address: { 
                                    '$regex': '.*' + req.body.address + '.*', $options: 'i' 
                                }                          
			}});
                    }
                    
                    if( req.body.seats!=""){
                        queryx.push({ 
                            "$match": {
                            seats: {
                                $elemMatch: { seat: req.body.seats }
                            }                        
                    }});
                        
                    }
                    
            
            Subcategory.aggregate(queryx,
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
          
};