const router = require('express').Router();
const controllers = require('../controllers')


//  Routes regarding sign ups and logins
router.post('/signUp', controllers.signUp.main);
router.post('/login', controllers.login.main);

module.exports = router;