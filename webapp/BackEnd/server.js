const express= require('express');
const mysql = require('mysql2')
const cors=require('cors');
const app=express();
app.use(cors());

const db=mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'my-secret-pw',
    database:'foody'
});


app.get('/',(req,res)=>{
    return res.json("Welcome to the server");
});

app.get('/customer',(req,res)=>{
    const sqlSelect="SELECT * FROM customer";
    db.query(sqlSelect,(err,data)=>{
        if(err) return res.json({err:err});
        return res.json(data);
    })
});
app.listen(3001,()=>{
    console.log('Server is running on port 3001');
}); 