const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const auth = require('../../utils/auth');

// Route to create a new post
router.post('/', auth, async (req, res) => {
  try {
    const newPostData = {
      title: req.body.title,
      content: req.body.content,
      userId: req.session.userId 
    };
    console.log("Creating new post with data:", newPostData);

    const newPost = await Post.create(newPostData);

    res.status(200).json(newPost);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json(err);
  }
});

// Route to get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{
        model: User,
        as: 'user',
        attributes: ['username']
      }, {
        model: Comment,
        as: 'comments',
        include: {
          model: User,
          as: 'user',
          attributes: ['username']
        }
      }]
    });

    // Sending all posts as a response
    res.status(200).json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json(err);
  }
});

// Route to update a post
router.put('/:id', auth, async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
        userId: req.session.userId
      }
    });

    if (!postData[0]) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json(err);
  }
});

// Route to delete a post
router.delete('/:id', auth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        userId: req.session.userId
      }
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json(err);
  }
});

module.exports = router;