const db = require("../models");
const jwt = require("jsonwebtoken");
const handleTokenGooge = require("../scripts/handleGoogleToken");

module.exports = {
  createEvent: async (req, res) => {
    const data = req.body;

    try {
      const eventData = await db.Event.create(data);
      const dbData = await db.User.findByIdAndUpdate(
        { _id: data.event_owners },
        { $push: { events_owned: eventData._id } },
        { new: true }
      );
      res.json(dbData);
    } catch (error) {
      res.json(error);
    }
  },
  attendEvent: async (req, res) => {
    const eventId = req.body.event_id;
    const userId = req.body.user_id;

    try {
      //  This is a good candidate for refactor into one query instead of two.

      const checkForExistingUser = await db.Event.find({
        _id: eventId,
        event_signed_up: { $in: [userId] }
      });

      if (checkForExistingUser.lexngth == 0) {
        const dbData = await db.Event.findOneAndUpdate(
          { _id: eventId },
          { $push: { event_signed_up: userId } },
          { new: true }
        );
        res.json(dbData);
      } else {
        res.json({
          msg: "User already in event_signed_up queue"
        });
      }
    } catch (error) {
      res.json(error);
    }
  }
};
