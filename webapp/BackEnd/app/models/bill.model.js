module.exports=(sequelize,Sequelize) => {
    const Bill=sequelize.define("bill",{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true
        },
        customer_id:{
            type:Sequelize.INTEGER
        },
        restaurant_id:{
            type:Sequelize.INTEGER
        },
        customer_address_id:{
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
        customer_driver_rating:{
            type:Sequelize.INTEGER
        },
        customer_restaurant_rating:{
            type:Sequelize.INTEGER
        },
    });
    return Bill;
};