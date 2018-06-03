const router = require("express").Router();
const controllers = require("../controllers");
const passport = require('../scripts/passportConfig');


//  Routes regarding sign ups and logins
router.post("/signUp", controllers.user.signUp);
router.post("/login", controllers.user.login);



module.exports = router; 