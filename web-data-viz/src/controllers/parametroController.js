var parametroModel = require("../models/parametroModel");

function atualizarParametro(req, res) {
    var id_empresa = req.body.id_empresa;
    var limite_baixo = req.body.limite_baixo;
    var limite_ok = req.body.limite_ok;

    // Validações
    if (id_empresa == undefined) {
        res.status(400).send("id_empresa está undefined!");
    } else if (limite_baixo == undefined) {
        res.status(400).send("limite_baixo está undefined!");
    } else if (limite_ok == undefined) {
        res.status(400).send("limite_ok está undefined!");
    } else {
        parametroModel.atualizarParametro(id_empresa, limite_baixo, limite_ok)
            .then((resultado) => {
                res.status(200).json(resultado);
            })
            .catch((erro) => {
                console.log("Houve um erro ao atualizar os parâmetros: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}


function padronizarParametro(req, res) {
    var empresa = req.body.id_empresa;

    // Validação
    if (empresa == undefined) {
        res.status(400).send("id_empresa está undefined!");
    } else {
        parametroModel.padronizarParametro(empresa)
            .then((resultado) => {
                res.status(200).json(resultado);
            })
            .catch((erro) => {
                console.log("Houve um erro ao padronizar os parâmetros: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function mostrarParametro(req, res) {
    const empresa = req.query.id_empresa;
    if (empresa == undefined) {
        res.status(400).send("id_empresa está undefined!");
    } else {
        parametroModel.mostrarParametro(empresa)
            .then((resultado) => {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).json([]); // No content
                }
            })
            .catch((erro) => {
                console.log("Houve um erro ao buscar os parâmetros: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    atualizarParametro,
    padronizarParametro,
    mostrarParametro
};
