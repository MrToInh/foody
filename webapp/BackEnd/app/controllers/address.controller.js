const db = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const User = db.user;
const Address = db.address;
const Op = db.Op;

exports.addAddress = async (req, res) => {
    try{
        const token = req.session.token;
        if(!token){
            return res.status(403).send({message: "Unauthorized access! Please login first."});
        }
        jwt.verify(token, config.secret, async (err, decoded) => {
            if(err){
                return res.status(401).send({message: "Invalid token!"});
            }
            else{
                const userId = decoded.id;
                let user = await User.findByPk(userId);
                if(!user){
                    return res.status(404).send({message: "User not found."});
                }
                const address = await Address.create({
                    unit_number: req.body.unit_number,
                    street_number: req.body.street_number,
                    city: req.body.city,
                    region: req.body.zip,
                    UserId: userId
                });
                if(address){
                    res.send({message: "Address added successfully!"});
                }}});
    }catch(err){
        res.status(500).send({message: err.message});
    }
};


