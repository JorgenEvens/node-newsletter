var Controller = require('./base'),
	Campaign = require('../models').Campaign;

module.exports = Controller( 'campaigns', Campaign, 'campaign', 'campaigns' );