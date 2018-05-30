const db = require('../models');

module.exports = {
    main: (req, res) => {
        console.log(db.Password.create({
            id_user: 1,
            password: 'germaniscool'
        }))
        res.send('Hello from login js')
    }
}