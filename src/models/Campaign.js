module.exports = function(sequelize, DataTypes) {
	var Campaign = sequelize.define('Campaign', {
		title: DataTypes.STRING,
		sender: DataTypes.STRING,
		template: DataTypes.INTEGER,
		active: DataTypes.BOOLEAN,
		content: DataTypes.TEXT,
		scheduled: DataTypes.DATE,
		started: DataTypes.DATE,
		finished: DataTypes.DATE
	});

	return Campaign;
}