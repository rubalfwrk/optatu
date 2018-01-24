/**
 * @author harman
 * @description movie
 * @type type
 */

var Seat = require('../models/seat');
// Posts API

module.exports = function(apiRouter,s3,randomString,userupload){
	
   
	///plans/editparmal
        apiRouter.post('/seat/editparmal', function(req, res) {
        console.log(req.body);
        
        Seat.findById({'_id': req.body.id}, function(err, user) {
             
            if (err){
                res.send(err);
            }else{
            seat.seat = req.body.title;
               
            seat.save(function(err) {
                if (err){
                    res.send({"error" : 1,"message" : "Unable to edit seats"});
                }else{
                res.json({"error":0,"message":'Your data has been updated successfully','data':user});
            }
            })
        }
        });
    });
	//delete
        
        apiRouter.post('/seat/deleteseat', function(req, res){
                console.log(req.body);
		Seat.remove({
			_id: req.body.id
		}, function(err, post){
			if(err) res.send(err);

			res.json({ message: 'Seat deleted!' });
		})
	});


	/* Rubal Api */
	/* Add seat */
	apiRouter.post('/seats', function(req, res){
			console.log(req.body);
			var seats = new Seat();
            seats.seat = req.body.title;
            
            seats.save(function(err, seats){
            console.log(seats)
			if(err) res.send(err);
			res.json({error : 0 , season : seats , message: 'Seats Added!'});
		})
	});
	
	/* Get all categories */
	apiRouter.get('/seatlist', function(req, res){
            
		Seat.find({}, function(err, posts){
                console.log(posts);
                if (err) res.send(err);
                    res.json({error : 0 , data : posts});
		}).sort({ created_at : 1 });;
	});

};