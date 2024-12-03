var express = require("express");
var router = express.Router();

var empresaControllerH = require("../controllers/empresaControllerH");

router.get("/mostrarDadosEmpresa" , function (req, res) {
    empresaControllerH.mostrarDadosEmpresa(req, res);
});

router.post("/atualizarDadosEmpresa", function (req, res) {
    empresaControllerH.atualizarDadosEmpresa(req, res);
});

router.put("/desativarEmpresa", function (req, res) {
  empresaControllerH.desativarEmpresa(req, res);
});

module.exports = router;