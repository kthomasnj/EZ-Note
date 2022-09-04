const router = require('express').Router();

router.use('/', require('./homeRoutes'));

module.exports = router;