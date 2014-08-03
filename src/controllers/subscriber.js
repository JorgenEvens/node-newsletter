var Controller = require('./base'),
	Subscriber = require('../models').Subscriber;

module.exports = Controller( 'subscribers', Subscriber, 'subscriber', 'subscribers' );