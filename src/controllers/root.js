module.exports = {

	root: {
		path: '/',
		handler: function( req, res ) {
			res.render('home/home');
		}
	},

	components: {
		path: '/components',
		handler: function( req, res ) {
			res.render('components');
		}
	}
	
}