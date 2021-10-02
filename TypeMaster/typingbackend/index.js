require("./Routes/authenticate");
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require("express");
const path = require("path");
const PORT = 5000;
const app = express();
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const enforce = require("express-sslify");

const authRoutes = require("./Routes/authRoutes");
app.use(cors());
app.get('/',(req,res)=>{
    res.send('Hey');
    console.log('working');
})
app.listen(5000);