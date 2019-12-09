module.exports = function(passport) {

	var express = require('express');
	var router = express.Router();
	var col = require('../app/controllers/users_controller')

	router.get('/login', col.login)

	router.get('/register', col.register)

	router.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	})

	router.post('/login', col.loginform(passport))

	router.post('/register', col.registerform(passport))

	return router;
}
