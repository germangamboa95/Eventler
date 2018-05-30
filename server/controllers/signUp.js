const db = require('../models');
const googleSignUp = require('../scripts/handleGoogleToken')

module.exports = {
    main: async (req, res) => {
        console.log(db.Password.create({
            id_user: 1,
            password: 'germaniscool'
        }))

        let foo = await googleSignUp();

        res.send(foo)
    }
}