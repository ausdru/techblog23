const router = require('express').Router();
const auth = require('../utils/auth');
const { Post } = require('../models'); 

// Dashboard route
router.get('/', auth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        userId: req.session.userId
      }
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log('Dashboard posts:', posts); 
    res.render('dashboard', {
      layout: 'main',
      posts,
      onDashboard: true,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to edit a specific post
router.get('/edit-post/:id', auth, async (req, res) => {
  console.log("Edit post route accessed");
  try {
    console.log("Requested Post ID:", req.params.id);
    const postData = await Post.findByPk(req.params.id, {
      raw: true,
      nest: true
    });
    console.log("Post Data:", postData);
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    if (postData.userId !== req.session.userId) {
      res.status(403).json({ message: 'You do not have permission to edit this post!' });
      return;
    }

    res.render('edit-post', { post: postData, logged_in: req.session.logged_in });
  } catch (err) {
    console.error('Error fetching post for editing:', err);
    res.status(500).json(err);
  }
});
module.exports = router;



