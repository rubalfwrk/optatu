/**
 * @author harman
 * @description movie
 * @type type
 */

var Staticpage = require('../models/staticpage');
// Posts API

module.exports = function(apiRouter,s3,randomString,userupload){
	   
    /* Rubal api's */
    /* Add subcategories */
    apiRouter.post('/addstaticpages', function(req, res){
          // console.log(req.body);
               
                        var staticpages = new Staticpage();

                        staticpages.title = req.body.title;
                        staticpages.description = req.body.description;
	
			staticpages.save(function(err, staticpages){
			if(err) res.send(err);
			res.send({error : 0 , Staticpage : staticpages , message: 'Staticpages Added!'});

		});
		
	});
        
        apiRouter.post('/staticpage/staticpagebytitle', function(req, res){
        
            Staticpage.find({title : req.body.title}, function(err, post){
                
                    if (err) res.send(err);

                    res.json({error : 0 , staticpage : post});
            });
	});
 
          
};