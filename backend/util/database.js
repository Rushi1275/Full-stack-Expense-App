const Sequelize = require ('sequelize');

const sequelize =  new Sequelize('expenses', 'root','Rushi@0717',{
    dialect : 'mysql',
    host : 'localhost'
});

module.exports = sequelize;
