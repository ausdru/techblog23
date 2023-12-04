const router = require('express').Router();
const { User } = require('../../models');
const bcryptjs = require('bcryptjs');


// Login route
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await bcryptjs.compare(req.body.password, userData.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.logged_in = true;
            console.log('Session ID:', req.session.id, 'Session Data:', req.session);

            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

// Logout route
router.post('/logout', (req, res) => {
    console.log('Cookies sent with request:', req.cookies);

    const sessionId = req.session.id;

    if (req.session.logged_in) {
        req.session.destroy(() => {
            console.log('Logging out session ID:', sessionId);

            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// Registering account route
router.post('/register', async (req, res) => {
    try {
        console.log('Received data for registration:', req.body);

        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: await bcryptjs.hash(req.body.password, 10)
        });

        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.logged_in = true;
            res.status(200).json({ user: userData, message: 'Registration successful!' });
        });
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ message: 'Username already in use. Please choose another.' });
        } else {
            console.error('Error during user registration:', err);
            res.status(400).json({ message: 'Unable to register', error: err });
        }
    }
});

module.exports = router;