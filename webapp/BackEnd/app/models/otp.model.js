module.exports=(sequelize,Sequelize)=>{
    const Otp=sequelize.define("Otp",{
        email:{
            type:Sequelize.STRING
        },
        otp:{
            type:Sequelize.INTEGER
        },
        expiration: {
            type: Sequelize.DATE, 
        }
          
    });
    return Otp;
};