const db = require("../../models");
const User = db.user;
const Role = db.role;
const Restaurant = db.Restaurant;

const Op = db.Sequelize.Op;

exports.addrestaurant = async (req, res) => {
    try {
        const userId = req.userId;
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
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.updateRestaurant = async (req, res) => {
    try {
        const userId = req.userId;
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
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}
exports.getRestaurant = async (req, res) => {
  const { id, restaurant_name } = req.query;

  try {
    let restaurant;
    if (id) {
      restaurant = await Restaurant.findByPk(id);
    } else if (restaurant_name) {
      restaurant = await Restaurant.findOne({ where: { restaurant_name } });
    }

    if (!restaurant) {
      return res.status(404).send({ message: 'Restaurant not found.' });
    }

    res.status(200).send(restaurant);
  } catch (error) {
    console.log('Error:', error);
    res.status(500).send({ message: 'Error retrieving restaurant.' });
  }
};
exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.status(200).send(restaurants);
  } catch (error) {
    console.log('Error:', error);
    res.status(500).send({ message: 'Error retrieving restaurants.' });
  }
};