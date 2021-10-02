

// Load passport configurations
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

// Routes
const authRoutes = require("./Routes/authRoutes");
// const apiRoutes = require("./routes/apiRoutes");

// Define middleware here


app.use(cors());
app.use(bodyParser.json());
// const bodyParser = require('body-parser');
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// // Serve up static assets (usually on heroku)

// // app.use(
// //   cookieSession({
// //     maxAge: 24 * 60 * 60 * 1000, // 24-hour session
// //     keys: [process.env.cookieKey]
// //   })
// // );
// app.use(passport.initialize());
// app.use(passport.session()); 
// if (PORT) {
//   app.use(enforce.HTTPS({ trustProtoHeader: true }));
// }
app.get('/',(req,res)=>{
    res.send('Hi!');
});
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE,PUT');
  
    next();
});

app.use('/auth',authRoutes);


// Connect to the Mongo DB
mongoose
  .connect("mongodb+srv://typemaster:sivasai@cluster0.io8wd.mongodb.net/User?retryWrites=true&w=majority", {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// Use the routes
// app.use(apiRoutes);


// handle any asynchronous error during express pipeline
// app.use(function(err, req, res, next) {
//   if (res.headersSent) {
//     return next(err);
//   }
//   req.logout();
//   res.status(500).redirect("/");
// });

// Send every other request to the React app
// Define any API routes before this runs


app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});