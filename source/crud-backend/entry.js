//importing modules

var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');

var app = express();

const route = require('./route/route.js');

//constants
const DBPATH = 'mongodb://localhost:27017/shoppinglist';
const PORT = 3000;

//connect to mongodb
mongoose.connect(DBPATH, {useNewUrlParser: true});

//db on connection success
mongoose.connection.on('conected',()=>{
    console.log('MongoDB connected on port 27017')
});

//db on connection error
mongoose.connection.on('error', (err)=>{
    console.log(err);
});

//adding middleware - cors
//allows different ports to communicate with each other
app.use(cors());

//adding middleware - body-parser
//parses json data in req body
app.use(bodyparser.json());

//calls ending with /api will be routed to route.js
app.use('/api', route);

app.get('/', (req, res)=>{
    res.send('foobar');
});

app.listen(PORT, ()=>{
    console.log('Server has been started at port: ' + PORT);
});
