const db = require('../models');
const jwt = require('jsonwebtoken')
const handleTokenGooge = require("../scripts/handleGoogleToken");

module.exports = {
    createEvent: async (req, res) => {
        const data = req.body; 
        const eventData = await db.Event.create(data); 
        const dbData = await db.User.findByIdAndUpdate(
            {_id: data.event_owners},
            {$push:{events_owned: eventData._id}},
            {new: true}
        )
        res.json(dbData);
    }
}