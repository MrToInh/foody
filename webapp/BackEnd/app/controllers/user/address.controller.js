const db = require("../../models");
const User = db.user;
const Address = db.Address;
const UserAddress = db.UserAddress;

exports.addAddress = async (req, res) => {
    try{
        const userId = req.userId;
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
    }catch(err){
        res.status(500).send({message: err.message});
    }
};

exports.getAllAddresses = async (req, res) => {
    try {
        const userId = req.userId;
        const userAddresses = await UserAddress.findAll({ where: { user_id: userId } });
        const addresses = await Promise.all(userAddresses.map(async (userAddress) => {
            return await Address.findByPk(userAddress.address_id);
        }));
        return res.send(addresses);
    } catch (err) {
        return res.status(500).send({ message: err.message || "Some error occurred while retrieving the addresses." });
    }
}

exports.updateAddress = async (req, res) => {
    try {
        const userId = req.userId;
        const { addressId, unit_number, street_number, city, region } = req.body;
        const userAddress = await UserAddress.findOne({ where: { user_id: userId, address_id: addressId } });
        if (!userAddress) {
            return res.status(404).send({ message: "Address not found." });
        }
        await Address.update({ unit_number, street_number, city, region }, { where: { id: addressId } });
        return res.send({ message: "Address updated successfully." });
    } catch (err) {
        return res.status(500).send({ message: err.message || "Some error occurred while updating the address." });
    }
}

exports.editAddress = async (req, res) => {
    try {
      const { id } = req.params;
      const { unit_number, street_number, city, region } = req.body;
      const address = await Address.findByPk(id);
      if (!address) {
        return res.status(404).send({ message: "Address not found." });
      }
      address.unit_number = unit_number || address.unit_number;
      address.street_number = street_number || address.street_number;
      address.city = city || address.city;
      address.region = region || address.region;
      await address.save();
      return res.send({ message: "Address updated successfully." });
    } catch (err) {
      return res.status(500).send({ message: err.message || "Some error occurred while updating the address." });
    }
  };

exports.deleteAddress = async (req, res) => {
    try {
        const userId = req.userId;
        const { addressId } = req.body;
        const userAddress = await UserAddress.findOne({ where: { user_id: userId, address_id: addressId } });
        if (!userAddress) {
            return res.status(404).send({ message: "Address not found." });
        }
        await UserAddress.destroy({ where: { user_id: userId, address_id: addressId } });
        await Address.destroy({ where: { id: addressId } });
        return res.send({ message: "Address deleted successfully." });
    } catch (err) {
        return res.status(500).send({ message: err.message || "Some error occurred while deleting the address." });
    }
}

exports.getAddressById = async (req, res) => {
    try {
        const { id } = req.params;
        const address = await Address.findByPk(id);
        if (!address) {
            return res.status(404).send({ message: "Address not found." });
        }
        return res.send(address);
    } catch (err) {
        return res.status(500).send({ message: err.message || "Some error occurred while retrieving the address." });
    }
}