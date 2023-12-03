const { Post } = require('../models');

const postSeeds = [
  {
    title: 'Happy Halloween',
    date: '2023-10-31 11:30:00',
    content: 'Hey everybody, Happy Halloween. Hope you get lots of candy!',
    user_id: 1,
  },
  {
    title: 'Loving the weather',
    date: '2023-11-12 14:00:00',
    content: 'Gotta love the seasons changing. Hope you are all healthy & well.',
    user_id: 2,
  },
];

const seedPosts = async () => {
  await Post.bulkCreate(postSeeds);
};

module.exports = seedPosts;
