module.exports=(sequelize,Sequelize)=>{
    const Notification=sequelize.define("Notification",{
        title:{
            type:Sequelize.STRING
        },
        body:{
            type:Sequelize.JSON
        },
        token:{
            type:Sequelize.STRING
        },
        userId: {
            type: Sequelize.INTEGER
        },
        driverId: {
            type: Sequelize.INTEGER,
        },
        orderId: {
            type: Sequelize.INTEGER,
        }
    });
    return Notification;
}