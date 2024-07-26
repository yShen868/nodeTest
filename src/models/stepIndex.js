const { Sequelize, DataTypes } = require( 'sequelize');
const config = require( '../config/database');

const sequelize = new Sequelize(config.development);

sequelize.authenticate()
  .then(() => console.log('Database connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

module.exports = {
  Step: require('./Step')(sequelize, DataTypes),
  sequelize,
  Sequelize
};
