const express = require('express');
const app = express();//use all express property
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });
require("./db/conn");
const cookiePraser = require('cookie-parser');
//json middleware
app.use(express.json());
app.use(cookiePraser());
//const User = require("./model/userSchema");

//without .env file
//const DB = "mongodb+srv://MERN:fromYoutube@cluster0.usb3v.mongodb.net/MERNStack?retryWrites=true&w=majority";
//with .env file

//secaure port number
const PORT = process.env.PORT || 5000;

//connection use in many place so connecttion code cut in other file then only require no use const
//const DB = process.env.DATABASE_LINK;
//mongoose.connect(DB , { useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true, useFindAndModify:false }).then( () => { console.log(`connection successfull`); } ).catch( (error) => console.log(`no connection`) );

app.get('/', middelware ,(req, res) => {
    res.send('hello world from the server');
});

//link all router file
app.use(require("./route/auth"));

/*
app.get('/about', (req, res) => {
    res.send('about from the server');
});

app.get('/contact', (req, res) => {
    res.send(' contact from the server');
});

app.get('/signin', (req, res) => {
    res.send(' signin or login  from the server');
});

app.get('/signup', (req, res) => {
    res.send(' registration or signup from the server');
});
*/

if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
}

app.listen(PORT,() => {
    console.log(`server is running at port number ${PORT}`);
});