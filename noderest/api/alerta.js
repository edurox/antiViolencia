var express = require("express");
var db = require("../db/database");
var Alerta = require("../domain/alerta");

const router = express.Router();

router.get("/:id", (req, res) => {
    let idUsuario = req.params.id;

    db.query(Alerta.buscar(idUsuario), (err, data)=> {
        if(!err) {
            if(data && data.length > 0) {
                res.status(200).json({
                    message:"Dados obtidos com sucesso",
                    localizacao: data
                });
            } else {
                res.status(200).json({
                    message:"Problema ao retornar do banco ou sem dados encontrados"
                });
            }
        }
    });

});

router.get("/:id/:alerta", (req, res) => {
    let idUsuario = req.params.id;

    db.query(Alerta.inserir(idUsuario), (err)=> {
        if(!err) {
            if(!err) {
                res.status(200).json({
                    message:"Alerta dado com sucesso"
                });
            } else {
                console.log(err)
            }
        }
    });

});


module.exports = router;