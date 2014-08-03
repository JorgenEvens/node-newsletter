var events = require('events'),
	emitter = new events.EventEmitter(),

	extractData = function(el) {
		console.log( el.attributes );
		var data = {},
			i = el.attributes.length;

		while(i--) {
			name = el.attributes[i].nodeName;
			if( /^data-/.test(name) )
				data[name.replace(/^data-/,'')] = el.getAttribute(name);
		}

		return data;
	}

	handler = function( e ) {
		var tag = e.target,
			action = tag.getAttribute('data-action');

		if( !action )
			return;

		e.data = extractData(tag);

		emitter.emit(action, e);
	},

	addEvent = function( el, e, handler ) {
		if( el.attachEvent ) return el.attachEvent('on'+e, handler);
		if( el.addEventListener ) return el.addEventListener(e, handler);
	};

addEvent( window, 'click', handler );

module.exports = emitter;