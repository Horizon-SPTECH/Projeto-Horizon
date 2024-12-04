var dashboardModel = require("../models/dashboardModel");


function recomendacaoGerada(req, res) {
    dashboardModel.recomendacaoGerada().then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar a quantidade de avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}

function listartMunicipios(req, res) {
    dashboardModel.listartMunicipios().then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar a quantidade de avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}

function maisFurto(req, res) {
    dashboardModel.maisFurto().then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar a quantidade de avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}

function maisFurtoMunicipioPorcentagem(req, res) {
    dashboardModel.maisFurtoMunicipioPorcentagem().then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar a quantidade de avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}


function menosFurto(req, res) {
    dashboardModel.menosFurto().then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar a quantidade de avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}

function menosFurtoMunicipioPorcentagem(req, res) {
    dashboardModel.menosFurtoMunicipioPorcentagem().then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar a quantidade de avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}


function furtosPor1kilometro(req, res) {
    dashboardModel.furtosPor1kilometro().then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar a quantidade de avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}

function objetosMaisRoubados(req, res) {
    dashboardModel.objetosMaisRoubados().then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar a quantidade de avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}

function mesesGraficos(req, res) {
    dashboardModel.mesesGraficos().then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar a quantidade de avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}


function furtosMeses(req, res) {
    dashboardModel.furtosMeses().then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar a quantidade de avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}

function diaSemanaGraficos(req, res) {
    dashboardModel.diaSemanaGraficos().then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar a quantidade de avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}

function furtoSemanas(req, res) {
    dashboardModel.furtoSemanas().then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar a quantidade de avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}

function furtosSemanasUnica(req, res) {
  var municipio = req.params.municipio

  dashboardModel.furtosSemanasUnica(municipio).then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar a quantidade de avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}

function furtosMesesUnica(req, res) {
  var municipio = req.params.municipio

  dashboardModel.furtosMesesUnica(municipio).then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar a quantidade de avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}

function furtosIndi(req, res) {
  var municipio = req.params.municipio

  dashboardModel.furtosIndi(municipio).then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar a quantidade de avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}

function objetosMaisRoubadosIndi(req, res) {
  var municipio = req.params.municipio

  dashboardModel.objetosMaisRoubadosIndi(municipio).then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar a quantidade de avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}

function porcentualFurtos(req, res) {
  var municipio = req.params.municipio

  dashboardModel.porcentualFurtos(municipio).then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar a quantidade de avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}

function parametrosEmpresa(req, res) {
  var idEMpresa = req.params.idEMpresa

  dashboardModel.parametrosEmpresa(idEMpresa).then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar a quantidade de avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}


module.exports = {
  listartMunicipios,
  maisFurto,
  maisFurtoMunicipioPorcentagem,
  menosFurto,
  menosFurtoMunicipioPorcentagem,
  furtosPor1kilometro,
  objetosMaisRoubados,
  mesesGraficos,
  furtosMeses,
  diaSemanaGraficos,
  furtoSemanas,
  furtosSemanasUnica,
  furtosMesesUnica,
  furtosIndi,
  objetosMaisRoubadosIndi,
  porcentualFurtos,
  parametrosEmpresa,
  recomendacaoGerada
};
