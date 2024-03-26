module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customer", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        fisrtname: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },
    });
    return Customer;
}