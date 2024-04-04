module.exports=(sequelize,Sequelize)=>{
    const Address=sequelize.define("address",{
        unit_number:{
            type:Sequelize.STRING
        },
        street_number:{
            type:Sequelize.STRING
        },
        city:{
            type:Sequelize.STRING
        },
        region:{
            type:Sequelize.STRING
        }
    });
    return Address;
};