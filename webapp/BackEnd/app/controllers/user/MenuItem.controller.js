const db = require("../../models");
const User = db.user;
const MenuItem = db.MenuItem;

exports.createItem = async (req, res) => {
    try {
        const userId = req.userId;
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
    } catch (err) {
        return res.status(500).send({
            message: err.message || "Some error occurred while creating the MenuItem."
        });
    }
}

exports.deleteItem = async (req, res) => {
    try {
        const userId = req.userId;
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
    } catch (err) {
        return res.status(500).send({
            message: err.message || "Some error occurred while deleting the MenuItem."
        });
    }
}

exports.updateItem = async (req, res) => {
    try {
        const userId = req.userId;
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
                id: req.body.id
            }
        });

        return res.send({ message: "Item updated successfully." });
    } catch (err) {
        return res.status(500).send({
            message: err.message || "Some error occurred while updating the MenuItem."
        });
    }
}

// Get all menu items
exports.getAllItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.findAll();
        return res.send(menuItems);
    } catch (err) {
        return res.status(500).send({
            message: err.message || "Some error occurred while retrieving the menu items."
        });
    }
}

// Get all menu items for a specific restaurant
exports.getItemsByRestaurant = async (req, res) => {
    try {
        const restaurantId = req.params.restaurantId;
        const menuItems = await MenuItem.findAll({
            where: {
                restaurant_id: restaurantId
            }
        });
        return res.send(menuItems);
    } catch (err) {
        return res.status(500).send({
            message: err.message || "Some error occurred while retrieving the menu items."
        });
    }
}
exports.getItemById = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const menuItem = await MenuItem.findByPk(itemId);
        return res.send(menuItem);
    } catch (err) {
        return res.status(500).send({
            message: err.message || "Some error occurred while retrieving the menu item."
        });
    }
}