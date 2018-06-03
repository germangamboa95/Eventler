const db = require("../models");
const handleTokenGooge = require("../scripts/handleGoogleToken");

module.exports = {
  signUp: async (req, res) => {
    const type = req.params.type;
    const token = req.body.token;

    const userDataRaw = await handleTokenGooge(token);
    const userGoogId = userDataRaw.userid;
    const userCleanedData = userDataRaw.payload;

    try {
      const dbData = await db.User.create({
        google_id: userGoogId,
        first_name: userCleanedData.given_name,
        last_name: userCleanedData.family_name,
        img_url: userCleanedData.picture,
        email: userCleanedData.email,
        type: "tester"
      });
      res.json(dbData);
    } catch (error) {
      res.send(error);
    }
  },
  login: async (req, res) => {
    const token = req.body.token;

    const userDataRaw = await handleTokenGooge(token);
    const userGoogId = userDataRaw.userid;

    const user = await db.User.find({ google_id: userGoogId });

    const payload = { id: user.google_id };

    const tokenSigned = jwt.sign(payload, process.env.SECRET_OR_KEY);

    res.json({
      token: tokenSigned,
      user: user[0]._id
    });
  }
};
