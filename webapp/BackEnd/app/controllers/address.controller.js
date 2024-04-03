const db = require("../models");
const Address = db.address;
const Op = db.Op;

// Create and Save a new MenuItem
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
// exports.findOne = (req, res) => {
//     const id = req.params.id;

//     MenuItem.findByPk(id)
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: `Error retrieving MenuItem with id = ${id}`
//             });
//         });
// }
// exports.update = (req, res) => {
//     const id = req.params.id;

//     MenuItem.update(req.body, {
//         where: { id: id }
//     })
//         .then(num => {
//             if (num == 1) {
//                 res.send({
//                     message: "MenuItem was updated successfully."
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot update MenuItem with id=${id}. Maybe MenuItem was not found or req.body is empty!`
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: `Error updating MenuItem with id=${id}`
//             });
//         });
// }
// exports.delete = (req, res) => {
//     const id = req.params.id;

//     MenuItem.destroy({
//         where: { id: id }
//     })
//         .then(num => {
//             if (num == 1) {
//                 res.send({
//                     message: "MenuItem was deleted successfully!"
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot delete MenuItem with id=${id}. Maybe MenuItem was not found!`
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: `Could not delete MenuItem with id=${id}`
//             });
//         });
// }
// exports.deleteAll = (req, res) => {
//     MenuItem.destroy({
//         where: {},
//         truncate: false
//     })
//         .then(nums => {
//             res.send({ message: `${nums} MenuItems were deleted successfully!` });
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while removing all menu items."
//             });
//         });
// }
// exports.findAllPublished = (req, res) => {
//     MenuItem.findAll({ where: { published: true } })
//     .then(data => {
//         res.send(data);
//     })
//     .catch(err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while retrieving menu items."
//         });
//     });
// }