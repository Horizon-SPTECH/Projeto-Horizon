var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/listarFuncionarios/:idEMpresa", function(req, res){
    usuarioController.listarFuncionarios(req, res);
});

router.put("/desativarUsuario/:idUser", function(req, res){
    usuarioController.desativarUsuario(req, res);});

router.post("/gerarToken", function (req, res) {
    usuarioController.gerarToken(req, res);
});

router.post("/verificarToken", function (req, res) {
    usuarioController.verificarToken(req, res);
});

router.post("/alterarSenha", function (req, res) {
    usuarioController.alterarSenha(req, res);
});

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

router.put("/desativarFuncionario/:idUsuario", function (req, res) {
    usuarioController.desativarFuncionario(req, res);
});

router.put("/atualizarUsuario/:idUsuario", function (req, res) {
    usuarioController.atualizarUsuario(req, res);
});

router.get("/verificarSenha/:idUsuario", function (req, res) {
    usuarioController.verificarSenha(req, res);
});

module.exports = router;