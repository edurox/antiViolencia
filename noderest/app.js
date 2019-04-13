var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors");

var usuario = require("./api/usuario");
var localizacao = require("./api/localizacao");
var alerta = require("./api/alerta");

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.use("/usuario",usuario);
app.use("/localizacao",localizacao);
app.use("/alerta",alerta);

//if we are here then the specified request is not found
app.use((req,res,next)=> {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

//all other requests are not implemented.
app.use((err,req, res, next) => {
   res.status(err.status || 501);
   res.json({
       error: {
           code: err.status || 501,
           message: err.message
       }
   });
});

module.exports = app;