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

      if (checkForExistingUser.length == 0) {
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
  },
  approveAttend: async (req, res) => {
    const eventId = req.body.event_id;
    const userId = req.body.user_id;

    try {
      const checkForExistingUser = await db.Event.find({
        _id: eventId,
        event_attendees_approved: { $in: [userId] }
      });

      if (checkForExistingUser.length == 0) {
        const dbData = await db.Event.findOneAndUpdate(
          { _id: eventId },
          {
            $push: { event_attendees_approved: userId },
            $pull: { event_signed_up: userId }
          },
          { new: true }
        );

        res.json(dbData);
      } else {
        res.json({
          msg: "User already in approved queue"
        });
      }
    } catch (error) {
      res.json(error);
    }
  },
  revokeAttend: async (req, res) => {
    const eventId = req.body.event_id;
    const userId = req.body.user_id;

    try {
      const checkForExistingUser = await db.Event.find({
        _id: eventId,
        event_attendees_approved: { $in: [userId] }
      });

      if (checkForExistingUser.length != 0) {
        const dbData = await db.Event.findOneAndUpdate(
          { _id: eventId },
          {
            $pull: { event_attendees_approved: userId },
            $push: { event_signed_up: userId }
          },
          { new: true }
        );

        res.json(dbData);
      } else {
        res.json({
          msg: "I cannot do that Dave."
        });
      }
    } catch (error) {
      res.json(error);
    }
  },
  getOwnedEvents: async (req, res) => {
    const userId = req.params.id;
    try {
      const dbData = await db.User.find({ _id: userId }).populate([
        "events_owned"
      ]);

      //    If no user found throw error saying no user found!
      if (dbData.length === 0) throw new Error("User not found!");

      res.json(dbData);
    } catch (error) {
      res.json({
        msg: error.message
      });
    }
  },
  getEventData: async (req, res) => {
    const eventId = req.params.id;
    try {
      const dbData = await db.Event.findOne({ _id: eventId }).populate([
        "event_owners",
        "event_signed_up",
        "event_attendees_approved"
      ]);
      res.json(dbData);
    } catch (error) {
      res.json({ msg: error.message });
    }
  },
  updateEvent: async (req, res) => {
    const field = req.body.field;
    const value = req.body.value;
    const eventId = req.body.event_id;

    try {
      if(field === "_id") throw new Error('Cannot change _id!')
      const dbData = await db.Event.findByIdAndUpdate(
        { _id: eventId },
        { [field]: value },
        { new: true }
      );
      res.json(dbData);

    } catch (error) {
      res.json({ msg: error.message });
    }
  }
};
