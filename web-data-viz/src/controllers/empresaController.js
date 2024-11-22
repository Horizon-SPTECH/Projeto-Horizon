var empresaModel = require("../models/empresaModel");

// function buscarPorCnpj(req, res) {
//   var cnpj = req.query.cnpj;

//   empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
//     res.status(200).json(resultado);
//   });
// }

// function listar(req, res) {
//   empresaModel.listar().then((resultado) => {
//     res.status(200).json(resultado);
//   });
// }

// function buscarPorId(req, res) {
//   var id = req.params.id;

//   empresaModel.buscarPorId(id).then((resultado) => {
//     res.status(200).json(resultado);
//   });
// }

function cadastrar(req, res) {
  var cnpj = req.body.cnpj;
  var razaoSocial = req.body.razaoSocial;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    if (resultado.length > 0) {
      res
        .status(401)
        .json({ mensagem: `a empresa com o cnpj ${cnpj} já existe` });
    } else {
      empresaModel.cadastrar(razaoSocial, cnpj).then((resultado) => {
        res.status(201).json(resultado);
      });
    }
  });
}

function listartMunicipios(req, res) {
  empresaModel.listartMunicipios().then(function (resultado) {
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
  empresaModel.maisFurto().then(function (resultado) {
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
  empresaModel.maisFurtoMunicipioPorcentagem().then(function (resultado) {
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
  empresaModel.menosFurto().then(function (resultado) {
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
  empresaModel.menosFurtoMunicipioPorcentagem().then(function (resultado) {
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
  empresaModel.furtosPor1kilometro().then(function (resultado) {
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
  empresaModel.objetosMaisRoubados().then(function (resultado) {
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
  empresaModel.mesesGraficos().then(function (resultado) {
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
  empresaModel.furtosMeses().then(function (resultado) {
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
  empresaModel.diaSemanaGraficos().then(function (resultado) {
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
  empresaModel.furtoSemanas().then(function (resultado) {
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

  empresaModel.furtosSemanasUnica(municipio).then(function (resultado) {
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

  empresaModel.furtosMesesUnica(municipio).then(function (resultado) {
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

  empresaModel.furtosIndi(municipio).then(function (resultado) {
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

  empresaModel.objetosMaisRoubadosIndi(municipio).then(function (resultado) {
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

  empresaModel.porcentualFurtos(municipio).then(function (resultado) {
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

  empresaModel.parametrosEmpresa(idEMpresa).then(function (resultado) {
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
  cadastrar,
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
  parametrosEmpresa
};
