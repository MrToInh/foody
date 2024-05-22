const { fcm } = require("googleapis/build/src/apis/fcm");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    fullname: {
      type: Sequelize.STRING
    },
    phone_number:{
      type: Sequelize.STRING
    },
    remember_token: {
      type: Sequelize.STRING
    },
    fcm_token: {
      type: Sequelize.STRING
    },
  });
  return User;
};
