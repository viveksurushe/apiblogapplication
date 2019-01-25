const express = require('express');
const appConfig = require('./config/appConfig');
const fs = require('fs');
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const GlobalErrorMiddleware=require('./middlewares/appErrorHandler');
const routeLoggerMiddleware = require('./middlewares/routeLogger');

const app = express();

//midleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

app.use(GlobalErrorMiddleware.globalErrorHandler);
app.use(routeLoggerMiddleware.logIp)

let modelsPath = './models';
fs.readdirSync(modelsPath).forEach(function (file) {
    console.log('including the models file');
    console.log(modelsPath + '/' + file);
    if (~file.indexOf('.js')){
        require(modelsPath + '/' + file);
    } 
});


let routesPath = './routes';
fs.readdirSync(routesPath).forEach(function (file) {
    if (~file.indexOf('.js')) {
        console.log('including the following file');
        console.log(routesPath + '/' + file);
        let route = require(routesPath + '/' + file);
        route.setRouter(app);
    }
});

app.use(GlobalErrorMiddleware.globalNotFoundHandler);

app.listen(appConfig.port, () => {
    console.log("listen to port 3000");
    let db = mongoose.connect(appConfig.db.uri, { useMongoClient: true });
});

//handling mongoose connection error
mongoose.connection.on('error',function(err){
    console.log("Database connection error");
    console.log(err);
});


//handling mondoose success event
mongoose.connection.on('open',function(err){
    if(err){
        console.log("Database Error"+err);
    }else{
        console.log("Database connection open success");
    }
});