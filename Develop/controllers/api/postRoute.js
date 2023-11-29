const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const auth = require('../../utils/auth');

// Get All Posts:
router.get("/", (req, res) => {
    Post.findAll({
            attributes: ["post_id", "post_content", "post_title", "created_at"],
            order: [
                ["created_at", "desc"]
            ],
            include: [{
                    model: User,
                    attributes: ["user_name"],
                },
                {
                    model: Comment,
                    attributes: ["comment_id", "comment_text", "post_id", "user_id", "created_at"],
                    include: {
                        model: User,
                        attributes: ["user_name"],
                    },
                },
            ],
        })
        .then((dbPostData) => res.json(dbPostData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get Single Post:
router.get("/:id", (req, res) => {
    Post.findOne({
            where: {
                post_id: req.params.post_id,
            },
            attributes: ["post_id", "post_content", "post_title", "created_at"],
            include: [{
                    model: User,
                    attributes: ["user_name"],
                },
                {
                    model: Comment,
                    attributes: ["post_id", "comment_text", "post_id", "user_id", "created_at"],
                    include: {
                        model: User,
                        attributes: ["user_name"],
                    },
                },
            ],
        })
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({
                    message: "Invalid ID! No post found."
                });
                return;
            }
            res.json(dbPostData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Create New Post:
router.post("/", auth, (req, res) => {
    console.log("Creating new post...");
    Post.create({
            post_title: req.body.post_title,
            post_content: req.body.post_content,
            user_id: req.session.user_id
        })
        .then((dbPostData) => res.json(dbPostData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Updating Existing Post:
router.put("/:id", auth, (req, res) => {
    Post.update({
            post_title: req.body.post_title,
            post_content: req.body.post_content,
        }, {
            where: {
                post_id: req.params.post_id,
            },
        })
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({
                    message: "No post found with this id"
                });
                return;
            }
            res.json(dbPostData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Deleting Post:
router.delete("/:id", auth, (req, res) => {
    Post.destroy({
            where: {
                post_id: req.params.post_id,
            },
        })
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({
                    message: "Invalid ID! No post found."
                });
                return;
            }
            res.json(dbPostData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
