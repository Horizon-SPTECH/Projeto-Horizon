var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/listartMunicipios/", function(req, res){
  dashboardController.listartMunicipios(req, res);
});

router.get("/maisFurto/", function(req,res){
  dashboardController.maisFurto(req, res);
});

router.get("/maisFurtoMunicipioPorcentagem", function(req,res){
  dashboardController.maisFurtoMunicipioPorcentagem(req, res);
});

router.get("/menosFurto/", function(req,res){
  dashboardController.menosFurto(req, res);
});

router.get("/menosFurtoMunicipioPorcentagem", function(req,res){
  dashboardController.menosFurtoMunicipioPorcentagem(req, res);
});

router.get("/furtosPor1kilometro", function(req,res){
  dashboardController.furtosPor1kilometro(req, res);
});

router.get("/objetosMaisRoubados", function(req, res){
  dashboardController.objetosMaisRoubados(req, res);
});

router.get("/mesesGraficos", function(req,res){
  dashboardController.mesesGraficos(req,res);
});

router.get("/diaSemanaGraficos", function(req, res){
  dashboardController.diaSemanaGraficos(req, res);
});

router.get("/furtosMeses", function(req, res){
  dashboardController.furtosMeses(req, res);
});

router.get("/furtoSemanas", function(req, res){
  dashboardController.furtoSemanas(req, res);
});

router.get("/furtosSemanasUnica/:municipio", function(req, res){
  dashboardController.furtosSemanasUnica(req, res);
});

router.get("/furtosMesesUnica/:municipio", function(req, res){
  dashboardController.furtosMesesUnica(req,res);

});
router.get("/furtosIndi/:municipio", function(req, res){
  dashboardController.furtosIndi(req, res);
});

router.get("/objetosMaisRoubadosIndi/:municipio", function(req, res){
  dashboardController.objetosMaisRoubadosIndi(req, res);
});

router.get("/porcentualFurtos/:municipio", function(req, res){
  dashboardController.porcentualFurtos(req, res);

});

router.get("/parametrosEmpresa/:idEMpresa", function(req, res){
  dashboardController.parametrosEmpresa(req, res);
});

router.get("/recomendacaoGerada", function(req, res){
  dashboardController.recomendacaoGerada(req, res);
});


module.exports = router;