const db = require("../models");
const Address = db.address;
const Op = db.Op;


exports.create = (req, res) => {
    if(!res.body.title){
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const address={
        unit_number: req.body.unit_number,
        street_number: req.body.street_number,
        city: req.body.city,
        region: req.body.region,
    }

    Address.create(address).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the MenuItem."
        });
    });
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
