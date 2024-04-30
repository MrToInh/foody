module.exports=(sequelize,Sequelize) => {
    const Order=sequelize.define("Order",{
        user_id:{
            type:Sequelize.INTEGER
        },
        user_address_id:{
            type:Sequelize.INTEGER
        },
        order_status_id:{
            type:Sequelize.STRING
        },
        delivery_id:{
            type:Sequelize.INTEGER
        },
        price:{
            type:Sequelize.DECIMAL
        },
        order_date:{
            type:Sequelize.DATE
        },
        delivery_fee:{
            type:Sequelize.DECIMAL
        },
        request_delivery_date:{
            type:Sequelize.DATE
        },
        user_driver_rating:{
            type:Sequelize.INTEGER
        },
        user_restaurant_rating:{
            type:Sequelize.INTEGER
        },
    });
    return Order;
};
  