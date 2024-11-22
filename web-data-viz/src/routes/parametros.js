var express = require("express");
var router = express.Router();

var parametroController = require("../controllers/parametroController");

router.post("/atualizarParametro", function (req, res) {
  parametroController.atualizarParametro(req, res);
});

router.post("/padronizarParametro", function (req, res) {
  parametroController.padronizarParametro(req, res);
});

router.get("/mostrarParametro", function (req, res) {
  parametroController.mostrarParametro(req, res);
});


module.exports = router;
