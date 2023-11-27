const { Comment } = require('../models');

const commentSeeds = [

    {
        comment_date: 'October 31, 2023 13:00:00',
        comment_content: 'Happy Halloween to you too!',
        user_id: 4,
        post_id: 1,
    },

    {
        comment_date: 'October 31, 2023 13:12:22',
        comment_content: 'Have a good one :)',
        user_id: 2,
        post_id: 2,
    }

];

const seedComments = () => Comment.bulkCreate(commentSeeds);

module.exports = seedComments;