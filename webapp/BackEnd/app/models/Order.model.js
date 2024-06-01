module.exports=(sequelize,Sequelize) => {
    const Order=sequelize.define("Order",{
        user_id:{
            type:Sequelize.INTEGER
        },
        receiver_name:{
            type:Sequelize.JSON
        } ,
        from_address:{
            type:Sequelize.JSON
        },
        to_address:{
            type:Sequelize.JSON
        },
        item:{
            type:Sequelize.JSON
        },
        order_status_id:{
            type:Sequelize.STRING
        },
        delivery_id:{
            type:Sequelize.INTEGER
        },
        blacklist: {
            type: Sequelize.STRING,
            defaultValue: '',
          },
        price:{
            type:Sequelize.DECIMAL
        },
        phone:{
            type:Sequelize.INTEGER
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
  