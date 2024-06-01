const { verifySignUp } = require("../../middleware");
const controller = require("../../controllers/user/auth.controller");
const { verifyToken } = require("../../middleware/authJwt");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  app.put("/api/auth/editProfile",verifyToken, controller.editProfile);
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
  app.put("/api/auth/editProfile",verifyToken, controller.editProfile);
  app.post("/api/auth/signout",verifyToken, controller.signout);
  app.post("/api/auth/verifyOTP", controller.verifyOTP);
  app.post("/api/auth/forgotPassword", controller.forgotPassword);
  app.get("/api/auth/getUserProfile",verifyToken, controller.getUserProfile);
  
};
