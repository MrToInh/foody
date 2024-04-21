module.exports=(sequelize,Sequelize) => {
    const Bill=sequelize.define("bill",{
        
        user_id:{
            type:Sequelize.INTEGER
        },
        restaurant_id:{
            type:Sequelize.INTEGER
        },
        user_address_id:{
            type:Sequelize.INTEGER
        },
        order_status_id:{
            type:Sequelize.INTEGER
        },
        delivery_id:{
            type:Sequelize.INTEGER
        },
        order_date:{
            type:Sequelize.DATE
        },
        delivery_fee:{
            type:Sequelize.DECIMAL
        },
        total_amount:{
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
    return Bill;
};