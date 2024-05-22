const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const session = require('express-session');
const admin = require('firebase-admin');
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

// Initialize Firebase
process.env.GOOGLE_APPLICATION_CREDENTIALS="my-applicationw2-7ab21-firebase-adminsdk-h8edm-f1cfbcc5c9.json" ;
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: 'my-applicationw2-7ab21',
});

// database
const db = require("./app/models");
const Role = db.role;
const Orderstatus = db.Orderstatus;


db.sequelize.sync();
require("./app/routes/user/auth.routes")(app);
require("./app/routes/user/user.routes")(app);
require("./app/routes/user/menu_item.router")(app);
require("./app/routes/user/restaurant.router")(app);
require("./app/routes/user/address.router")(app);
require("./app/routes/user/otp.routes")(app);
require("./app/routes/user/order.routes")(app);
require("./app/routes/user/notification.router")(app);


require("./app/routes/driver/auth.routes")(app);
require("./app/routes/driver/otp.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
app.get('/', (req, res) => {
  res.send('Welcome to Foody App Server!');
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