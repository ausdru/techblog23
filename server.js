// Server Configuration:
const path = require('path');

const express = require('express');

const router = require('./controllers');

const sequelize = require('./config/connection');

const exphbs = require('express-handlebars');

const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });

const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();

const PORT = process.env.PORT || 3001;

// ---------------------------------------------------------------------------
// Session Configuration:
const userSession = {
    secret: 'f6c2e26da9035bcc47904e59890fe987bf21e7a58a250e07f8f44a18caf0b1ae',
    cookie: {
        maxAge: 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

// ---------------------------------------------------------------------------
// Handlebars Engine Setup:
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// ---------------------------------------------------------------------------
// Body-parsing Middleware:
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------------------------------------------------------------------
// Session Middleware:
app.use(session(userSession));

// ---------------------------------------------------------------------------
// Routes Setup:
app.use(router);

// ---------------------------------------------------------------------------
// Starting Server & Syncing With Database:
sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log(`Application now listening on ${PORT}!`));
});
