const   Express = require('express'),
        mongoose = require('mongoose'),
        cookieparser = require('cookie-parser'),
        bodyparser = require('body-parser'),
        bcryptjs = require('bcryptjs');

// Connect to DB (I'm using Mongodb/Atlas)
const   dbConnect = require('./helper/db');
dbConnect("mongodb+srv://admin:dbaSvxPVJq3U4zEZ@cluster0.7r0k9.mongodb.net/authEx?retryWrites=true&w=majority")

// Define PORT
const   PORT = process.env.PORT || 4000

// Creating a APP
const app = Express();

// Middlewares
app.use(bodyparser.json());
app.use(cookieparser());

// Including Routes
const UserRoute = require('./routes/UserRoute');

// Routes
app.use('/user', UserRoute);

// Running App 
app.listen(PORT, (err)=>{
    if(err) return console.log(err);
    console.log(`Server started on ${PORT} Port`);
});



