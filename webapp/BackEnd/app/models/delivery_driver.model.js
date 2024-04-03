module.exports = (sequelize, Sequelize) => {
    const DeliveryDriver = sequelize.define("delivery_driver", {
        // id: {
        //     type: Sequelize.INTEGER,
        //     primaryKey: true
        // },
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        }
    });
    return DeliveryDriver;
};