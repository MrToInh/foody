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



exports.findAll = (req, res) => {
    const restaurant_id = req.query.restaurant_id;
    var condition = restaurant_id ? { restaurant_id: { [Op.like]: `%${restaurant_id}%` } } : null;

    MenuItem.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send(500).send({
                message: err.message || "Some error accurred while retrieving menu items."
            });
        });
}
exports.findOne = (req, res) => {
    const id = req.params.id;

    MenuItem.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving MenuItem with id = ${id}`
            });
        });
}
exports.update = (req, res) => {
    const id = req.params.id;

    MenuItem.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "MenuItem was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update MenuItem with id=${id}. Maybe MenuItem was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error updating MenuItem with id=${id}`
            });
        });
}
exports.delete = (req, res) => {
    const id = req.params.id;

    MenuItem.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "MenuItem was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete MenuItem with id=${id}. Maybe MenuItem was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Could not delete MenuItem with id=${id}`
            });
        });
}
exports.deleteAll = (req, res) => {
    MenuItem.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} MenuItems were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all menu items."
            });
        });
}
exports.findAllPublished = (req, res) => {
    MenuItem.findAll({ where: { published: true } })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving menu items."
        });
    });
}