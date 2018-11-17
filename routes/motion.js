var router = require('express').Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('motion detected');
});

module.exports = router;
