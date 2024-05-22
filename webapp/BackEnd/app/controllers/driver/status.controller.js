// Import the DeliveryDriver model
const DeliveryDriver = require('../models/deliveryDriver.model.js');

// Function to get the status of a driver
exports.getDriverStatus = async (driverId) => {
  try {
    const driver = await DeliveryDriver.findByPk(driverId);
    if (!driver) {
      throw new Error('Driver not found');
    }
    return driver.status;
  } catch (error) {
    throw error;
  }
};

// Function to update the status of a driver
exports.updateDriverStatus = async (driverId, newStatus) => {
  try {
    const driver = await DeliveryDriver.findByPk(driverId);
    if (!driver) {
      throw new Error('Driver not found');
    }
    driver.status = newStatus;
    await driver.save();
  } catch (error) {
    throw error;
  }
};