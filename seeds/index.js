const { Sequelize } = require('sequelize');
require('dotenv').config();

const seedUsers = require('./userSeeds');
const seedPosts = require('./postSeeds');
const seedComments = require('./commentSeeds');

const seedAll = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await sequelize.sync();

    await seedUsers();
    await seedPosts();
    await seedComments();

    process.exit(0);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};


seedAll();

