const express = require('express')

require('dotenv').config();

//  Require internal packages
const routes = require('./routes')
const db = require('./models')
//  Init express
const app = express();



app.use('/api', routes.Api)


//  Error Catcher
app.use(function (error, req, res, next) {
    console.log(error);
    res.json({ message: error });
});



const PORT = process.env.PORT || 3001;




db.sequelize.sync({ force:false }).then (function(){
    app.listen(PORT, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Server running on Port:', PORT);
        }
    
    })
});