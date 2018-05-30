
module.exports = function(sequelize, DataTypes) {
    // REQUIRED DEPENDENCIES
    const Sequelize = require("sequelize");
  
    // PASSWORDS TABLE
    // ADD ASSOCIATION FOREIGN KEY WITH USERS
    const Password = sequelize.define("Password", {
      id_user: {
        type: Sequelize.INTEGER,
      },
      password: {
        type: Sequelize.STRING
      }
    });
  
    return Password;
  };