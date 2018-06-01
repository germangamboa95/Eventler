const db = require("../models");
const handleTokenGooge = require("../scripts/handleGoogleToken");

module.exports =  async (req, res) => {

    const type = req.params.type; 

    const token = req.body.token;

    const userDataRaw = await handleTokenGooge(token);

    const userGoogId = userDataRaw.userid;
    const userCleanedData = userDataRaw.payload;

    console.log(userGoogId)

    try {
        const dbData = await db.User.create({
            google_id: userGoogId,
            first_name:userCleanedData.given_name, 
            last_name: userCleanedData.family_name,
            img_url: userCleanedData.picture,
            email: userCleanedData.email,
            type: "tester"
        }); 

        res.json(dbData);

    } catch (error) {
        res.send(error);
    }
  }
