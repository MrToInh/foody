const db = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const User = db.user;
const MenuItem = db.menu_item;
const Op = db.Sequelize.Op;

exports.additem = async (req, res) => {
    try {
        const token = req.session.token;
        if (!token) {
            return res.status(403).send({
                message: "Unauthorized access! Please login first."
            });
        }
        
        jwt.verify(token, config.secret, async (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Invalid token!"
                });
            } else {
                const userId = decoded.id;
                const user = await User.findByPk(userId);
                if (!user) {
                    return res.status(404).send({
                        message: "User not found."
                    });
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
                    return res.status(403).send({
                        message: "Only admins or owners can add items."
                    });
                }
                
                
                const existingItem = await MenuItem.findOne({
                    where: {
                        restaurant_id: req.body.restaurant_id,
                        item_name: req.body.item_name
                    }
                });
                
                
                if (existingItem) {
                    return res.status(400).send({
                        message: "Item already exists for this restaurant."
                    });
                }

                const menu_items = await MenuItem.create({
                    id: req.body.id,
                    restaurant_id: req.body.restaurant_id,
                    item_name: req.body.item_name,
                    price: req.body.price,
                    description: req.body.description,
                    category: req.body.category,
                    image: req.body.image,
                });

                return res.send({ message: "Add item successfully" });
            }
        });
    } catch (err) {
        return res.status(500).send({
            message: err.message || "Some error occurred while creating the MenuItem."
        });
    }
}



exports.deleteItem = async (req, res) => {
    try {
        const token = req.session.token;
        if (!token) {
            return res.status(403).send({
                message: "Unauthorized access! Please login first."
            });
        }
        
        jwt.verify(token, config.secret, async (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Invalid token!"
                });
            } else {
                const userId = decoded.id;
                const user = await User.findByPk(userId);
                if (!user) {
                    return res.status(404).send({
                        message: "User not found."
                    });
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
                    return res.status(403).send({
                        message: "Only admins or owners can delete items."
                    });
                }

                await MenuItem.destroy({
                    where: {
                        id: req.body.id
                    }
                });

                return res.send({ message: "Item deleted successfully." });
            }
        });
    } catch (err) {
        return res.status(500).send({
            message: err.message || "Some error occurred while deleting the MenuItem."
        });
    }
}

exports.updateItem = async (req, res) => {
    try {
        const token = req.session.token;
        if (!token) {
            return res.status(403).send({
                message: "Unauthorized access! Please login first."
            });
        }
        
        jwt.verify(token, config.secret, async (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Invalid token!"
                });
            } else {
                const userId = decoded.id;
                const user = await User.findByPk(userId);
                if (!user) {
                    return res.status(404).send({
                        message: "User not found."
                    });
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
                    return res.status(403).send({
                        message: "Only admins or owners can update items."
                    });
                }

                const { restaurant_id, item_name, price, description, category, image } = req.body;
                await MenuItem.update({
                    restaurant_id,
                    item_name,
                    price,
                    description,
                    category,
                    image
                }, {
                    where: {
                        id: req.query.id
                    }
                });

                return res.send({ message: "Item updated successfully." });
            }
        });
    } catch (err) {
        return res.status(500).send({
            message: err.message || "Some error occurred while updating the MenuItem."
        });
    }
}
exports.getAllItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.findAll();
        return res.send(menuItems);
    } catch (err) {
        return res.status(500).send({
            message: err.message || "Some error occurred while retrieving menu items."
        });
    }
}
exports.getItemById = async (req, res) => {
    try {
        const menuItem = await MenuItem.findByPk(req.body.id);
        if (!menuItem) {
            return res.status(404).send({
                message: "Item not found."
            });
        }
        return res.send(menuItem);
    } catch (err) {
        return res.status(500).send({
            message: err.message || "Some error occurred while retrieving the menu item."
        });
    }
}

