var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar/:idEmpresa", function (req, res) {
    usuarioController.cadastrar(req, res);

})

//Recebendo os dados do html e direcionando para a função autenticar de usuarioController.js
router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

//Recebendo os dados do html e direcionando para a função autenticar de usuarioController.js
router.get("/perfilUsuario/:idUsuario", function (req, res) {
    usuarioController.perfilUsuario(req, res);
});

router.put("/desativarUsuario/:idUsuario", function (req, res) {
    usuarioController.desativarUsuario(req, res);
});


module.exports = router;