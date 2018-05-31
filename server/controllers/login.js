const db = require('../models');
const jwt = require('jsonwebtoken')
const handleTokenGooge = require("../scripts/handleGoogleToken");

module.exports = async (req, res) => {
        const token = req.body.token;

        const userDataRaw = await handleTokenGooge(token);
        const userGoogId = userDataRaw.userid;

        const user = await db.User.find({google_id: userGoogId });

        const payload = {id: user.google_id}; 

        const tokenSigned = jwt.sign(payload, process.env.SECRET_OR_KEY);
       
        res.json({
            token: tokenSigned,
            user: user[0]._id
        });
    }