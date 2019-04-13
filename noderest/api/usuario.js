var express = require("express");
var db = require("../db/database");
var Usuario = require("../domain/usuario");

const router = express.Router();
router.get("/:email/:senha", (req, res) => {
    let email = req.params.email;
    let senha = req.params.senha;

    db.query(Usuario.logar(email, senha), (err, data)=> {
        if(!err) {
            if(data && data.length > 0) {
                res.status(200).json({
                    message:"Login feito",
                    usuario: data
                });
            } else {
                res.status(200).json({
                    message:"Email nao encontrado"
                });
            }
        }else {
            console.log(err)
        }
    });
});


module.exports = router;