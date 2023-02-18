const { Sequelize } = require('sequelize');
const env = require('./env.js');
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false,

    pool: {
        max : env.max,
        min : env.pool.min,
        acquire: env.pool.acquire,
        idle : env.pool.idle
    }
});

 const db = {};

 db.sequelize = Sequelize;
 db.sequelize = Sequelize;
 
 db.Customer = require(`../models/customer.models.js`)(sequelize, Sequelize);

 module.exports = db;

