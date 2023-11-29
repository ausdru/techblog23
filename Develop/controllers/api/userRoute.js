const router = require('express').Router();

const { User, Post, Comment } = require('../../models');

// 
router.get('/', (req, res) => {

    User.findAll({

        attributes: 
        {

            exclude: ['password']

        }

    })

    .then(dbUserData => res.json(dbUserData))

    .catch(err => {

        console.log(err);

        res.status(500).json(err);

    });

});

//
router.get('/:id', (req, res) => {

    User.findOne({

        attributes: {

            exclude: ['password']

        },

        where: {

            user_idid: req.params.user_id

        },

        include: [

            {
                
                model: Post,

                attributes: ['post_id', 'post_title', 'post_content', 'created_at']

            },

            {

                model: Comment,

                attributes: ['comment_id', 'comment_text', 'created_at'],

                include: {

                    model: Post,

                    attributes: ['post_title']

                }

            }

        ]

    })

    .then(dbUserData => {

        if (!dbUserData) {

            res.status(404).json({

                message: 'No user found with that ID.'

            });

            return;

        }

        res.json(dbUserData);

    })

    .catch(err => {

        console.log(err);

        res.status(500).json(err);

    });

});

//
router.post('/', (req, res) => {

    User.create({

        user_name: req.body.user_name,

        password: req.body.password

    })

    .then(dbUserData => {

        req.session.save(() => {

            req.session.user_id = dbUserData.user_id;

            req.session.user_name = dbUserData.user_name;

            req.session.loggedIn = true;

            res.json(dbUserData);

        });

    })

    .catch(err => {

        console.log(err);

        res.status(500).json(err);

    });

});

// 
router.post('/login', (req, res) => {

    User.findOne({

        where: {

            username: req.body.user_name

        }

    })

    .then(dbUserData => {

        if (!dbUserData) {

            res.status(400).json({

                message: 'No account found with that username!'

            });

            return;

        }

        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {

            res.status(400).json({

                message: 'Incorrect password! Please try again.'

            });

            return;

        }

        req.session.save(() => {

            req.session.user_id = dbUserData.user_id;

            req.session.user_name = dbUserData.user_name;

            req.session.loggedIn = true;

            res.json({

                user: dbUserData,

                message: 'Logged in successfully.'

            });

        });

    })

    .catch(err => {

        console.log(err);

        res.status(500).json(err);

    });

});

//
router.post('/logout', (req, res) => {

    if (req.session.loggedIn) {

        req.session.destroy(() => {

            res.status(204).end();

        });

    } else {

        res.status(404).end();

    }

});

module.exports = router;