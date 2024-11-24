var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/listarFuncionarios/:idEMpresa", function(req, res){
    usuarioController.listarFuncionarios(req, res);
});

router.put("/desativarUsuario/:idUser", function(req, res){
    usuarioController.desativarUsuario(req, res);
});

router.post("/gerarToken", function (req, res) {
    usuarioController.gerarToken(req, res);
});

router.post("/verificarToken", function (req, res) {
    usuarioController.verificarToken(req, res);
});

router.post("/alterarSenha", function (req, res) {
    usuarioController.alterarSenha(req, res);
});


module.exports = router;