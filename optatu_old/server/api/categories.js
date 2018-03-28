/**
 * @author harman
 * @description movie
 * @type type
 */

var Category = require('../models/category');
// Posts API

module.exports = function(apiRouter,s3,randomString,userupload){
	
	/* Rubal Api */
	/* Add category */
	apiRouter.post('/categories', function(req, res){
            
            var categories = new Category();
            var img = req.body.image;
            var ico = req.body.ico;
                                        
            buf = new Buffer(img.replace(/^data:image\/\w+;base64,/, ""),'base64');
                        
            var data = {
              Body: buf,
              ContentEncoding: 'base64',
              ContentType: 'image/jpeg'
            };
            
           
            s3.putObject(data, function(err, data){	
            var pro_pic = "https://s3.us-east-2.amazonaws.com/optatu/"+randomString+".jpg";
             categories.category = req.body.title; 
            categories.image = pro_pic;  
         
            categories.save(function(err, categories){
            console.log(pro_pic);
            if(err){
                res.send(err);
            }
            else{
            buff = new Buffer(ico.replace(/^data:image\/\w+;base64,/, ""),'base64');
                        
            var dataa = {
              Body: buff,
              ContentEncoding: 'base64',
              ContentType: 'image/jpeg'
            };
                                              
            s3.putObject(dataa, function(err, dataa){	
            var icon = "https://s3.us-east-2.amazonaws.com/optatu/"+randomString+".jpg"; 
               categories.icon = icon;
               console.log(icon)
                categories.save(function(err, categories){
                if(err){
                res.send(err);
            }
            else{
                  res.json({error : 0 , season : categories , message: 'Category Added!'});
            }
                })
            });
                       
            
              
            }
            });
                        
           
            })
             
	});
	
	/* Get all categories */
	apiRouter.get('/categorylist', function(req, res){
		Category.find({}, function(err, posts){
			if (err) res.send(err);
			res.json({error : 0 , data : posts});
		}).sort({ created_at : -1 });;
	});
        
        //delete
        
        apiRouter.post('/category/deletecategory', function(req, res){
                console.log(req.body);
		Category.remove({
			_id: req.body.id
		}, function(err, post){
			if(err) res.send(err);

			res.json({ message: 'Post deleted!' });
		})
	});
};