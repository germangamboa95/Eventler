const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({
  google_id: {
    type: String,
    required: true,
    unique: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  img_url: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  events_signed_up: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
      default: null
    }
  ],
  events_approved: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
      default: null
    }
  ],
  events_attended: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
      default: null
    }
  ],
  events_owned: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
      default: null
    }
  ]
});

module.exports = mongoose.model("User", User);
