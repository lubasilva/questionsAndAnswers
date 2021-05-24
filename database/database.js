const Sequelize = require('sequelize')


// DBNAME -> name of your database
// USER -> user of your database
// PASSWORD -> password of your database
// PORT -> port of your database
// MYSQL



const connection = new Sequelize('DBNAME', 'USER', 'PASSWORD', {
    host: 'YOUR HOST',
    port: 'YOUR PORT',
    dialect: 'mysql'
})


module.exports = connection