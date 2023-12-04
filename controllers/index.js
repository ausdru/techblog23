const router = require('express').Router();
const apiRoute = require('./api');
const homeRoute = require('./homeRoute.js');
const dashboardRoute = require('./dashboardRoute.js');

router.use('/api', apiRoute);
router.use('/dashboard', dashboardRoute);
router.use('/', homeRoute);

module.exports = router;