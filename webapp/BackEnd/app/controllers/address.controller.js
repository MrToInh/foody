const db = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const User = db.user;
const Address = db.Address;
const Op = db.Op;
const UserAddress = db.UserAddress;

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
                    region: req.body.region,
                });
                if(address){
                    // Create a new UserAddress record
                    const userAddress = await UserAddress.create({
                        address_id: address.id,
                        user_id: userId
                    });
                    if(userAddress){
                        res.send({message: "Address added successfully and UserAddress record created!"});
                    } else {
                        res.send({message: "Address added but failed to create UserAddress record."});
                    }
                } else {
                    res.send({message: "Failed to add address."});
                }
            }
        });
    }catch(err){
        res.status(500).send({message: err.message});
    }
};
exports.updateAddress = async (req, res) => {
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
                const address = await Address.findOne({where: {id: req.body.id}});
                if(address.UserId === userId){
                    await address.update({
                        unit_number: req.body.unit_number,
                        street_number: req.body.street_number,
                        city: req.body.city,
                        region: req.body.region
                    });
                    res.send({message: "Address updated successfully!"});
                }else{
                    res.status(403).send({message: "Unauthorized access! You can only update your own address."});
                }
            }
        });
    }catch(err){
        res.status(500).send({message: err.message});
    }
}
exports.getRestaurantAddress = async (req, res) => {
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
                const address = await Address.findOne({where: {UserId: userId}});
                res.send(address);
            }
        });
    }catch(err){
        res.status(500).send({message: err.message});
    }
}
exports.getMenuItembyAddress = async (req, res) => {
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
                const address = await Address.findOne({where: {UserId: userId}});
                const restaurant = await db.restaurant.findOne({where: {address_id: address.id}});
                const menuItems = await db.menu_item.findAll({where: {restaurant_id: restaurant.id}});
                res.send(menuItems);
            }
        });
    }catch(err){
        res.status(500).send({message: err.message});
    }
}