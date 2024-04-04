const db = require("../models");
const Restaurant = db.restaurant;
const Op = db.Op;

exports.create = (req, res) => {
    if(!req.body.restaurant_name){
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const restaurant={
        restaurant_name: req.body.restaurant_name,
        address_id: req.body.address_id,
        restaurant_kind: req.body.restaurant_kind,
    }

    Restaurant.create(restaurant).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Restaurant."
        });
    });
}
exports.findAll = (req, res) => {
    const restauant_kind=req.query.restauant_kind;
    const address_id=req.query.address_id;
    var condition={}

    if(restauant_kind){
        condition.restauant_kind={ [Op.like]: `%${restauant_kind}%` };
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
    if(address_id){
        condition.address_id={ [Op.like]: `%${address_id}%` };
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
}
exports.findOne=(req,res)=>{
    const id= req.params.id;

    Restaurant.findByPk(id)
        .then(data=>{
            res.send(data);
        })
        .catch(err=>{
            res.status(500).send({
                message:`Error retrieving Restaurant with id = ${id}`
            })
        })
}
exports.update=(req,res)=>{
    const id= req.params.id;

    Restaurant.update(req.body,{
        where:{id:id}
    })
        .then(num=>{
            if(num==1){
                res.send({
                    message: "Restaurant was updated successfully."
                });
            }else{
                res.send({
                    message:`Cannot update Restaurant with id=${id}. Maybe MenuItem was not found or req.body is empty!`
                });
            }
        })
        .catch(err=>{
            res.status(500).send({
                message:`Cannot update Restaurant with id=${id}. Maybe MenuItem was not found or req.body is empty!`
            });
        });
}
exports.delete=(req,res)=>{
    const id=req.params.id;

    Restaurant.destroy({
        where:{id:id}
    })
        .then(num=>{
            if(num==1){
                res.send({
                    message:`Restaurant was deleted successfully!`
                })
            }else{
                res.send({
                    message:`Cannot delete Restaurant with id=${id}. Maybe Restaurant was not found!`
                })
            }
        })
        .catch(err=>{
            res.status(500).send({
                message:`Could not delete Restaurant with id=${id}`
            })
        })
}
