var _ = require('lodash'),
	crypto = require('crypto'),
	User = require('../models').User;

module.exports = {

	login: {
		method: ['get','post'],
		path: '/authentication/login',
		handler: function( req, res ) {
			if( req.method == 'POST' ) {
				var password = req.body.password,
					hash = crypto.createHash('md5');

				hash.update(password);
				password = hash.digest('hex');

				User.find({where: {
					username: req.body.username,
					password: password
				}})
				.success(function(user){
					req.session.user = user;
					res.redirect('/');
				})
				.fail(function(){
					delete req.body.password;

					res.render('authentication/login', req.body);
				});
			} else {
				res.render('authentication/login', {});
			}
		}
	}

};