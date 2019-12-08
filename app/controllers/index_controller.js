var laptops = require('../models/laptop')

exports.home = function(req,res) {
	laptops.getItems(function(items) {
		res.render('home', { Items: items, User: req.user  });
	})
}
