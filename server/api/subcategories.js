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
		})
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
            console.log("harmannnnn");
            
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
          // console.log(req.body);
               
                        var subcategories = new Subcategory();

                        subcategories.category_id = req.body.category_id;
                        subcategories.category = req.body.category;
                        subcategories.category_name = req.body.category_name;
                        subcategories.distance = req.body.distance;
                        subcategories.address = req.body.address;
                        subcategories.latitude = req.body.latitude;
                        subcategories.longitude = req.body.longitude;
                        var str = req.body.type;

                        var arr = str.split(",");

                        arr.forEach(function(element){
                            //console.log(element);
                            subcategories.dishes.push({'type':element});
                        });
				
			subcategories.save(function(err, subcategories){
			if(err) res.send(err);
			res.send({error : 0 , SubCategory : subcategories , message: 'Subcategory Added!'});

		});
		
	});
    
    /* Get list of subcategories on the basic of id's */
    apiRouter.post('/subcatbyid', function(req, res){
            console.log(req.body.category_id);
		Subcategory.find({category_id : req.body.category_id}, function(err, post){
                    console.log(post);
			if (err) res.send(err);

			res.json({error : 0 , subcatlist : post});
		});
	});
	
	apiRouter.post('/subcatbyaddress', function(req, res){
        
		 Subcategory.find( { address: { '$regex': '.*' + req.body.address+ '.*', $options: 'i' } } , function(err, post){
            console.log(post);       
			if (err) res.send(err);

			res.json({error : 0 , subcatlist : post});
		});
	});
	
	apiRouter.post('/subcatbysearchvalues', function(req, res){
        
            var finalarray =[
                                {  
			category:   { 
                                            '$regex': '.*' + req.body.category + '.*', $options: 'i' 
					}                          
				},
                                {  
			date:   { 
                                            '$regex': '.*' + req.body.date + '.*', $options: 'i' 
					}                          
				},
			{  
			time:   { 
                                            '$regex': '.*' + req.body.time + '.*', $options: 'i' 
					}                          
				},	
			{ 
			seat: 	{ 
                                            '$regex': '.*' + req.body.seat + '.*', $options: 'i'
					}                          
			}] ;
                    console.log( req.body.address);
                    if( req.body.address!=""){
                        finalarray.push({  
                            address: { 
                                    '$regex': '.*' + req.body.address + '.*', $options: 'i' 
                                }                          
			});
                    }
	
		Subcategory.find( {  "$or": finalarray
		 } , function(err, post){
                        console.log(post);       
			if (err) res.send(err);
			res.json({error : 0 , subcatlist : post});
		});
	});
};