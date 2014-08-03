var _ = require('lodash'),
	
	Controller = function( path, Model, instance, instances ) {

	function url( p ) {
		if( _.isEmpty( p ) )
			return '/' + path;

		p = p.replace(/^\//g,'');

		return '/' + path + '/' + p;
	};

	function tpl( name ) {
		return path + '/' + name;
	};

	var controller = {
		list: {
			path: url(''),
			handler: function( req, res ) {
				Model.findAll()
					.then(function(c){
						var vars = {};
						vars[instances] = c;

						res.render(tpl('list'), vars);
					})
					.error(function(){
						res.render(tpl('list'));
					})
			}
		},

		action: {
			method: 'post',
			path: url(''),
			handler: function( req, res ) {
				if( req.body.edit )
					return res.redirect( url(req.body.edit + '/edit') );

				if( !req.body['delete'] )
					return res.notFound();

				// Delete action
				Model.find(req.body['delete'])
					.then(function(item){
						return item.destroy();
					})
					.done(function(){
						controller.list.handler(req, res);
					})
			}
		},

		add: {
			path: url('create'),
			handler: function( req, res ) {
				var vars = { action: 'create' };
				vars[instance] = {};
				res.render(tpl('edit'),vars);
			}
		},

		create: {
			method: 'post',
			path: url('create'),
			handler: function( req, res ) {
				Model.create( req.body )
				.then(function( item ){
					res.redirect( url(item.id) );
				})
				.error(function(err){
					var vars = { action: 'create', error: 'err' };
					vars[instance] = req.body;

					res.render(tpl('edit'),vars)
				})
			}
		},

		edit: {
			path: url(':id/edit'),
			handler: function( req, res ) {
				Model.find( req.params.id )
				.then(function( item ) {
					if( !item )
						return res.notFound();

					var vars = {};
					vars[instance] = item;

					res.render(tpl('edit'),vars)
				})
				.error(function( campaign ) {
					return res.notFound();
				})
			}
		},

		save: {
			method: 'post',
			path: url(':id'),
			handler: function( req, res ) {
				Model.find( req.params.id )
				.then(function(item) {
					if( !item )
						return res.notFound();

					item.set(req.body);
					return item.save();
				})
				.then(function(){
					res.redirect(url(req.params.id));
				})
				.error(function() {
					res.notFound();
				})
			}
		},

		show: {
			path: url(':id'),
			handler: function( req, res ) {
				Model.find( req.params.id )
				.then(function( item ){
					if( !item )
						return res.notFound();

					var vars = {};
					vars[instance] = item;

					res.render(tpl('show'),vars)
				})
				.error(function(){
					res.notFound();
				})
			}
		}
	}

	return controller;
}

module.exports = Controller;