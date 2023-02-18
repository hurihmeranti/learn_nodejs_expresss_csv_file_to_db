const express = require('express');
const app = express();

const db = require('/app/config/db.js');

global.__basedir = __dirname;

db.sequelize.sync({force : true}).then(() =>{
    console.log("Drop and Resync with {force : true}");
});

let router = require("./app/routers/router.js");
app.use(express.static("resources"));
app.use('/', router);

const server = app.listen(6060, function(){
    let host = server.address().address
    let port = server.address().port
    
    console.log("Server Berjalan di port ", host, port);
})