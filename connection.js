const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('2020_mobile_survey', 'root', 'sawunggaling26a', {
    host: 'mapgeo.id',
    port: 3306,
    dialect: 'mysql',
    logging:false
  });

  module.exports =  sequelize;