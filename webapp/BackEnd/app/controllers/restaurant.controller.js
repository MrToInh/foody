const db = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Restaurant = db.Restaurant;

const Op = db.Sequelize.Op;

exports.addrestaurant = async (req, res) => {
    try {
        const token = req.session.token;
        if (!token) {
            return res.status(403).send({ message: "Unauthorized access! Please login first." });
        }
        jwt.verify(token, config.secret, async (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: "Invalid token!" });
            } else {
                const userId = decoded.id;
                let user = await User.findByPk(userId);
                if (!user) {
                    return res.status(404).send({ message: "User not found." });
                }
                const roles = await user.getRoles();
                let isAdminOrOwner = false;
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "admin" || roles[i].name === "owner") {
                        isAdminOrOwner = true;
                        break;
                    }
                }
                if (!isAdminOrOwner) {
                    
                    const ownerRole = await Role.findOne({ where: { name: 'owner' } });
                    await user.addRole(ownerRole);
                    user = await User.findByPk(userId);
                }

                const restaurant = await Restaurant.create({
                    restaurant_name: req.body.restaurant_name,
                    UserId: userId,
                    address_id: req.body.address_id,
                    restaurant_kind: req.body.restaurant_kind,
                });
                if (restaurant) {
                    res.send({ message: "Restaurant added successfully!" });
                }
            }
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.updateRestaurant = async (req, res) => {
    try {
        const token = req.session.token;
        if (!token) {
            return res.status(403).send({ message: "Unauthorized access! Please login first." });
        }
        jwt.verify(token, config.secret, async (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: "Invalid token!" });
            } else {
                const userId = decoded.id;
                let user = await User.findByPk(userId);
                if (!user) {
                    return res.status(404).send({ message: "User not found." });
                }
                const roles = await user.getRoles();
                let isAdminOrOwner = false;
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "admin" || roles[i].name === "owner") {
                        isAdminOrOwner = true;
                        break;
                    }
                }
                if (!isAdminOrOwner) {
                    return res.status(403).send({ message: "Unauthorized access! Please login first." });
                }
                const restaurant = await Restaurant.findOne({ where: { id: req.body.id } });
                if (restaurant.UserId === userId) {
                    await restaurant.update({
                        restaurant_name: req.body.restaurant_name,
                        address_id: req.body.address_id,
                        restaurant_kind: req.body.restaurant_kind,
                    });
                    res.send({ message: "Restaurant updated successfully!" });
                }
            }
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}