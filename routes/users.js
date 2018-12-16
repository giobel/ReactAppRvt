var express = require('express');
var router = express.Router();



/* GET users listing. 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/

/* GET users listing. */
router.get('/', function(req, res, next) {
 	res.locals.connection.query('SELECT * from filesize', function (error, results, fields) {
    if(error) throw error;
    //res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(results));
	});
});

module.exports = router;
