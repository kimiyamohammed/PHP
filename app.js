const dotenv = require('dotenv').config();
const express = require('express');
const db = require('./api/data/db.js');
const moviesRouter = require('./api/routers/router');
const app = express();

app.use(express.json());

app.use('/api',function(req,res,next){
    res.header("Access-Control-Allow-Origin","http://localhost:4200")
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE")
    next();
});

app.use(function(req,res,next){
    console.log(req.method,req.url);
    next();
});

app.use('/api',moviesRouter);

app.set("port",process.env.PORT);
const server = app.listen(app.get("port"),function(){
    console.log(process.env.SERVER_LISTEN_MSG, server.address().port)
});