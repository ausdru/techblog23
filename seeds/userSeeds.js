const { User } = require('../models');

const userSeeds = [
  {
    user_name: 'Borat',
    email: 'bangbang@gmail.com',
    password: 22,
  },
  {
    user_name: 'derp',
    email: 'mememan420@yahoo.com',
    password: 25,
  },
];

const seedUsers = async () => {
  // Check if users already exist
  const existingUsers = await User.findAll();
  if (existingUsers.length === 0) {
    // If no users exist, then create them
    await User.bulkCreate(userSeeds);
  } else {
    console.log('Users already exist. Skipping user seed.');
  }
};

module.exports = seedUsers;
