module.exports=(sequelize,Sequelize)=>{
    const Customer=sequelize.define("customer",{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true
        },
        firstname:{
            type:Sequelize.STRING
        },
        lastname:{
            type:Sequelize.STRING
        },
    });
    return Customer;
};