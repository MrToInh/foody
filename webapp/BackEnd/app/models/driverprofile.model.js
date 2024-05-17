module.exports=(sequelize,Sequelize)=>{
    const DriverProfile=sequelize.define("DriverProfile",{
        driver_id:{
            type:Sequelize.INTEGER
        },
        driver_licenseNumber:{
            type:Sequelize.STRING
        },
        vehicleType:{
            type:Sequelize.STRING
        },
        cicard_number:{
            type:Sequelize.STRING
        },
    });
    return DriverProfile;
}