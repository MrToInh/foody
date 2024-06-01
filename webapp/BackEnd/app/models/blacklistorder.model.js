module.exports=(sequelize,Sequelize) => {
    const BlacklistOrder=sequelize.define("BlacklistOrder",{
        order_id:{
            type:Sequelize.INTEGER
        },
        driver_id:{
            type:Sequelize.INTEGER
        },
    });
    return BlacklistOrder;
}