const express = require("express");
const exphs = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  
  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return;
    }
    console.log("Connected to MySQL database.");
});

module.exports = connection;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Static Files
app.use(express.static("public"));

//Template Engine
const handlebars = exphs.create({extname:".hbs"});
app.engine('hbs',handlebars.engine);
app.set("view engine","hbs");

//Routers
//1.admin
const adminRouter = require("./router/admin")
app.use("/",adminRouter)
//2.person
const personRouter = require("./router/person")
app.use("/person", personRouter)
//3.company
const companyRouter = require("./router/company")
app.use("/company", companyRouter)

//Listen Port
app.listen(port,()=>{
    console.log("Listening Port : "+port)
});
