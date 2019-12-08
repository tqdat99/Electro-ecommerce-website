var users = require('../models/user')

exports.login = function(req,res) {
	//console.log(req._passport.session && req._passport.session.user)
	res.render('login', { message: req.flash('loginMessage') });
}

exports.register = function(req,res) {
	res.render('register', { message: req.flash('signupMessage') });
}

exports.loginform = function(passport) {
	return function(req, res){
		passport.authenticate('local-login', function(error, user, info){
			console.log("user");
			console.log(user);
			if (user) {
				req.login(user, function(err) {
					console.log("err")
					console.log(err)
			    	if(!err) {
			    		console.log(user);
						res.redirect('/');
			        }
		      	});
			}
			else {
				req.flash('loginMessage', info)
				res.redirect('/users/login');
			}

		})(req, res);
	}
}

exports.registerform = function(passport) {
	return function(req, res){
			passport.authenticate('local-signup', function(error, user, info){
			if (user) {
			    req.flash('loginMessage', info)
				res.redirect('/users/login');
			}
			else {
				req.flash('signupMessage', info)
				res.redirect('/users/register');
			}
		})(req, res);
	}
}