var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");
const e = require("express");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    empresaController.cadastrar(req, res);
});

router.get("/listartMunicipios/", function(req, res){
    empresaController.listartMunicipios(req, res);
});

router.get("/maisFurto/", function(req,res){
    empresaController.maisFurto(req, res);
});

router.get("/maisFurtoMunicipioPorcentagem", function(req,res){
  empresaController.maisFurtoMunicipioPorcentagem(req, res);
});

router.get("/menosFurto/", function(req,res){
  empresaController.menosFurto(req, res);
});

router.get("/menosFurtoMunicipioPorcentagem", function(req,res){
  empresaController.menosFurtoMunicipioPorcentagem(req, res);
});

router.get("/furtosPor1kilometro", function(req,res){
   empresaController.furtosPor1kilometro(req, res);
});

router.get("/objetosMaisRoubados", function(req, res){
    empresaController.objetosMaisRoubados(req, res);
});

router.get("/mesesGraficos", function(req,res){
  empresaController.mesesGraficos(req,res);
});

router.get("/diaSemanaGraficos", function(req, res){
  empresaController.diaSemanaGraficos(req, res);
});

router.get("/furtosMeses", function(req, res){
  empresaController.furtosMeses(req, res);
});

router.get("/furtoSemanas", function(req, res){
  empresaController.furtoSemanas(req, res);
});

router.get("/furtosSemanasUnica/:municipio", function(req, res){
  empresaController.furtosSemanasUnica(req, res);
});

router.get("/furtosMesesUnica/:municipio", function(req, res){
  empresaController.furtosMesesUnica(req,res);

});
router.get("/furtosIndi/:municipio", function(req, res){
  empresaController.furtosIndi(req, res);
});

router.get("/objetosMaisRoubadosIndi/:municipio", function(req, res){
  empresaController.objetosMaisRoubadosIndi(req, res);
});

router.get("/porcentualFurtos/:municipio", function(req, res){
  empresaController.porcentualFurtos(req, res);

});

router.get("/parametrosEmpresa/:idEMpresa", function(req, res){
  empresaController.parametrosEmpresa(req, res);
});

// router.get("/buscar", function (req, res) {
//     empresaController.buscarPorCnpj(req, res);
// });

// router.get("/buscar/:id", function (req, res) {
//   empresaController.buscarPorId(req, res);
// });

// router.get("/listar", function (req, res) {
//   empresaController.listar(req, res);
// });


module.exports = router;