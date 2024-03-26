const db= require('../models');
const Customer=db.customer;
const Op=db.Sequelize.Op;
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');  
exports.signup=(req,res)=>{
    Customer.create({
        username:req.body.username,
        password:bcrypt.hashSync(req.body.password,8),
        firstname:req.body.firstname,
        lastname:req.body.lastname
    }).then((customer)=>{
        res.send({message:"Customer was registered successfully"});
    }).catch((err)=>{
        res.status(500).send({message:err.message});
    });
};