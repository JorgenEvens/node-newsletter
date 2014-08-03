var _ = require('lodash'),
	fs = require('fs');

module.exports = function( app ) {
	var attach = function( controller, c ) {
		var method = c.method || 'get';
		if( !_.isArray(method) )
			method = [ method ];

		_.each( method, function( m ){
			app[m]( c.path, c.handler.bind(controller) );
		});
	}

	_.each( fs.readdirSync( __dirname ), function( file ){
		if( !/\.js$/.test( file ) ) return;
		if( 'index.js' == file ) return;
		if( 'base.js' == file ) return;

		var controller = require('./' + file);
		_.forOwn( controller, _.partial(attach, controller));
	});
}