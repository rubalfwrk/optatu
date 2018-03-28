/**
 * @author rubal
 * @description movie
 * @type type
 */

var Managercategory = require('../models/managercategory');
// Posts API


/* Rubal Api */
	/* Add category */
apiRouter.post('/managercategories', function(req, res){
                console.log(req.body);
                
                var managercategories = new Managercategory();
    managercategories.category = req.body.title;
    //console.log(categories);
    managercategories.save(function(err, categories){
    //console.log(categories)
        if(err) res.send(err);
        res.json({error : 0 , season : managercategories , message: 'Category Added!'});
        })
});

/* Get all categories */

module.exports = function(apiRouter,s3,randomString,userupload){
	
        apiRouter.get('/managercategorylist', function(req, res){
		Managercategory.find({}, function(err, posts){
        console.log(posts);
			if (err) res.send(err);
			res.json({error : 0 , data : posts});
		}).sort({ created_at : -1 });;
	});
        
		
};