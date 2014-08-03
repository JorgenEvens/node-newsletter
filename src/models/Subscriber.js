module.exports = function(sequelize, DataTypes) {
	var Subscriber = sequelize.define('Subscriber', {
		name: { type: DataTypes.STRING, label: 'Name' },
		email: DataTypes.STRING,
		confirmed: DataTypes.BOOLEAN,
		blacklisted: DataTypes.BOOLEAN
	});

	return Subscriber;
}