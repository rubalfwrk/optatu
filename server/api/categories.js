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
        
    apiRouter.post('/uploadimageicon',userupload.array('file',3), function(req, res, next) {
            res.send(req.files);
        });    
    
    apiRouter.post('/uploadimage',userupload.array('file',3), function(req, res, next) {
            res.send(req.files);
    });    
    
    
    /* add category kuldeep */
     apiRouter.post('/add_categories', function(req, res){
        var catge = new Category();
            catge.category = req.body.category; 
            catge.image = req.body.image; 
            catge.icon = req.body.icon; 
            console.log(catge);
            catge.save(function(err,catge) {
            if (err){
                console.log(err.message)
                res.send({"error" : 1,"message" : "Unable to add category"});
            }else{
            res.json({"error":0,"message":'New category added successfully','data':catge});
        }
        })
         
    });
    
    //cat by id
        apiRouter.post('/category_id', function(req, res){
        console.log(req.body.id);
            Category.findById({_id : req.body.id}, function(err, post){
                console.log(post);
                    if (err) res.send(err);

                    res.json({error : 0 , subcatlist : post});
            });
	});
    
    // category/editparmal
        apiRouter.post('/category/update_category', function(req, res) {
        Category.findById({'_id': req.body.id}, function(err, cate) {
            
            if (err){
                res.send(err);
            }else{
            cate.category = req.body.category;               
            cate.image = req.body.image; 
            cate.icon = req.body.icon;
            console.log(cate)
            cate.save(function(err) {
                if (err){
                    console.log(err.message)
                    res.send({"error" : 1,"message" : "Unable to edit category"});
                }else{
                res.json({"error":0,"message":'Category updated successfully','data':cate});
                }
                })
            }
            });
        });
        
        
};