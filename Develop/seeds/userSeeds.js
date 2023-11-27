const { User } = require('../models');

const userSeeds = [

    {
        user_name: 'Borat',
        email: 'bangbangskeetskeet@gmail.com',
        password: abc123,
    },

    {
        user_name: 'derp',
        email: 'mememan420@yahoo.com',
        password: gratata222,
    },

];

const seedUsers = () => User.bulkCreate(userSeeds);

module.exports = seedUsers;