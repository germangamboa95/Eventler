const router = require("express").Router();
const controllers = require("../controllers");
const passport = require('../scripts/passportConfig');


//  Routes regarding sign ups and logins
router.post("/signUp", controllers.signUp);
router.post("/login", controllers.login);

// Routes to Events

//  Get Events Data Managed 
router.get('/user/managed/events')
router.get('/user/managed/event')

// Approve Attendee toggle 
router.post('/user/managed/events/:id')

// Create Events 
router.post('/user/managed/create/event', controllers.events.createEvent)

// Update an event
router.put('/user/managed/event')

// Get Events Data attendee 
router.get('/user/attended/event')
router.get('/user/attended/events')

// Sign up for event 
router.post('/user/attend/event', controllers.events.attendEvent)


module.exports = router;
