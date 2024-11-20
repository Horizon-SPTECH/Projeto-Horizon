var express = require("express");
var router = express.Router();

var parametroController = require("../controllers/parametroController");

router.post("/cadastrarParametro", function (req, res) {
  parametroController.cadastrarParametro(req, res);
});

module.exports = router;
