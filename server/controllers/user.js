const db = require("../models");
const jwt = require('jsonwebtoken');


module.exports = {
  signUp: async (req, res) => {
    const provider = req.locals.provider; 
    const user_id = req.locals.id;
    const userData = req.locals._json;
    
    const dbData = await db.User.find({provider: provider, id: user_id});

    if(dbData.length > 0) {
        req.dbData = dbData;
        req.sf = true;
        module.exports.login(req, res);
    }

    try {
      const dbData = await db.User.create({
       provider: provider,
       id: user_id,
       first_name: userData.name.givenName,
       last_name: userData.name.familyName,
       email: (userData.emails)? userData.emails[0].value : null,
       img_url:(userData.image)? userData.image['url'] : null
      });

      req.dbData = dbData;
      req.sf = false;
      module.exports.login(req, res);
    } catch (error) {
      res.send(error);
    }

  },
  login: async (req, res) => {
    const payload = { id: req.dbData[0].id};
    const tokenSigned = jwt.sign(payload, process.env.SECRET_OR_KEY);
    res.redirect(`http://localhost:3001?token=${tokenSigned}&done=${req.sf}&ui=${req.dbData[0]._id}`);
  }
};
