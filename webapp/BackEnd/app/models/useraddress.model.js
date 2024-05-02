module.exports = (sequelize, Sequelize) => {
    const UserAddress = sequelize.define("useraddress", {
      address_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      }
    });
    return UserAddress;
}