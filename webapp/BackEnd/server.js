const express= require('express');
const mysql = require('mysql2')
const cors=require('cors');
const app=express();
const cookieSession = require("cookie-session");
app.use(cors());


app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "bezkoder-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true,
    sameSite: 'strict'
  })
);

app.get('/',(req,res)=>{
    return res.json("Welcome to the server");
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
app.listen(3001,()=>{
    console.log('Server is running on port 3001');
}); 