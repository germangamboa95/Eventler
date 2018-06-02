const router = require("express").Router();
const controllers = require("../controllers");
const passport = require('../scripts/passportConfig');


//  Routes regarding sign ups and logins
router.post("/signUp", controllers.signUp);
router.post("/login", controllers.login);

// Routes to Events

//  Get Events Data Managed 
router.get('/user/managed/events/get/:id', controllers.events.getOwnedEvents)


// Approve Attendee toggle 
router.post('/user/managed/events/approve', controllers.events.approveAttend)
router.post('/user/managed/events/revoke', controllers.events.revokeAttend)

// Create Events 
router.post('/user/managed/create/event', controllers.events.createEvent)

// Update an event
router.post('/user/managed/event', controllers.events.updateEvent)

// Get Events Data signedUp
router.get('/user/get/event/:id', controllers.events.getEventData)


// Sign up for event 
router.post('/user/attend/event', controllers.events.attendEvent)

//  Event completed sort all attendees for analysis
router.post('/user/event/done', controllers.events.eventCompleted)
module.exports = router;
