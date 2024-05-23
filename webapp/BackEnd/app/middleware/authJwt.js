const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Driver = db.drivers;

verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token,
             config.secret,
             (err, decoded) => {
              if (err) {
                return res.status(401).send({
                  message: "Unauthorized!",
                });
              }
              req.userId = decoded.id;
              next();
             });
};
verifyTokenDriver = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token,
             config.secret,
             (err, decoded) => {
              if (err) {
                return res.status(401).send({
                  message: "Unauthorized!",
                });
              }
              req.driverId = decoded.id;
              next();
             });
};

isAdmin = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        return true;
      }
    }

    return false;
  } catch (error) {
    throw new Error("Unable to validate User role!");
  }
};

isOwner = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "owner") {
        return true;
      }
    }
    return false;
  } catch (error) {
    throw new Error("Unable to validate owner role!");
  }
};

isOwnerOrAdmin = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "owner" || roles[i].name === "admin") {
        return true;
      }
    }

    return false;
  } catch (error) {
    throw new Error("Unable to validate owner or Admin role!");
  }
};


const authJwt = {
  verifyToken,
  verifyTokenDriver,
  isAdmin,
  isOwner,
  isOwnerOrAdmin,
};
module.exports = authJwt;
