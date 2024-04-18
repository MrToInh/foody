module.exports=(sequelize,Sequelize)=>{
    const Otp=sequelize.define("otp",{
        email:{
            type:Sequelize.STRING
        },
        otp:{
            type:Sequelize.INTEGER
        },
        expiration: {
            type: Sequelize.DATE, // Thời gian đầy đủ bao gồm cả mili giây
        }
          
    });
    return Otp;
};