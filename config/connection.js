// const Sequelize = require('sequelize');
// require('dotenv').config();

// let sequelize;

// if (process.env.JAWSDB_URL) {
//   // Heroku deployment
//   sequelize = new Sequelize(process.env.JAWSDB_URL, {
//     dialect: 'mysql',
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false
//       },
//     },
//   });
// } else {
//   // Local development
//   sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: '127.0.0.1',
//     dialect: 'mysql',
//     port: 3306,
//   });
// }

// module.exports = sequelize;


const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST || "localhost",
      dialect: "mysql",
      port: process.env.DB_PORT || 3306,
    }
  );
}

console.log(sequelize);


module.exports = sequelize;

