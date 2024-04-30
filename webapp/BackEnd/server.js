const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const session = require('express-session');
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "foody-session",
    keys: ["COOKIE_SECRET"],
    httpOnly: true,
    sameSite: 'strict'
  })
);
app.use(session({
  secret: 'foody-session',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // set to true if your using https
}));

// database
const db = require("./app/models");
const Role = db.role;
const Orderstatus = db.Orderstatus;
const deliverydriver = db.Deliverydriver;

db.sequelize.sync();
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/menu_item.router")(app);
require("./app/routes/restaurant.router")(app);
require("./app/routes/address.router")(app);
require("./app/routes/otp.routes")(app);
require("./app/routes/order.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });
  Role.create({
    id: 2,
    name: "owner",
  });
  Role.create({
    id: 3,
    name: "admin",
  });

  Orderstatus.create({
    id: 1,
    status: "Pending",
  });
  Orderstatus.create({
    id: 2,
    status: "Processing",
  });
  Orderstatus.create({
    id: 3,
    status: "Delivered",
  });

  // deliverydriver.create({
  //   id: 1,
  //   driver_name: "Tinh",
  //   phone_number: "0123456789",
  //   status: "Available",
  // });
  // deliverydriver.create({
  //   id: 2,
  //   driver_name: "Manh",
  //   phone_number: "0987654321",
  //   status: "Available",
  // });
  // deliverydriver.create({
  //   id: 3,
  //   driver_name: "Dang",
  //   phone_number: "0123456789",
  //   status: "Available",
  // });
}
