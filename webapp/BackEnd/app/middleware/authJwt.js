const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Driver = db.drivers;

const createVerifyToken = (handleDecodedId) => (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    handleDecodedId(req, decoded.id);
    next();
  });
};

const verifyToken = createVerifyToken((req, id) => {
  req.userId = id;
});

const verifyTokenDriver = createVerifyToken((req, id) => {
  req.driverId = id;
});

const createRoleChecker = (rolesToCheck) => async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await roles.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (rolesToCheck.includes(roles[i].name)) {
        next();
        return;
      }
    }

    res.status(403).send({ message: "Require Owner or Admin Role!" });
  } catch (error) {
    throw new Error("Unable to validate role!");
  }
};

const isAdmin = createRoleChecker(["admin"]);
const isOwner = createRoleChecker(["owner"]);
const isOwnerOrAdmin = createRoleChecker(["owner", "admin"]);


const authJwt = {
  verifyToken,
  verifyTokenDriver,
  isAdmin,
  isOwner,
  isOwnerOrAdmin,
};
module.exports = authJwt;
