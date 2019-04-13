var express = require("express");
var db = require("../db/database");
var Localizacao = require("../domain/localizacao");

const router = express.Router();

router.get("/:id", (req, res) => {
    let idUsuario = req.params.id;

    db.query(Localizacao.buscar(idUsuario), (err, data)=> {
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

router.get("/:lat/:lon", (req, res) => {
    let lat = req.params.lat;
    let lon = req.params.lon;

    db.query(Localizacao.inserirLocalizacao(lat, lon), (err)=> {
        if(!err) {
            res.status(200).json({
                message:"Dados enviados com sucesso"
            });
        } else {
            console.log(err)
        }
    });

});


module.exports = router;