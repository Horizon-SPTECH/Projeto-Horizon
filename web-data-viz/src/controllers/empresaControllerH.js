var dadosEmpresaModel = require("../models/empresaModelH");

function atualizarDadosEmpresa(req, res) {
    var nome = req.body.nomeServer;
    var cep = req.body.cepServer
    var logradouro = req.body.logradouroServer;
    var complemento = req.body.complementoServer;
    var numero = req.body.numeroServer;
    var bairro = req.body.bairroServer;
    var estado = req.body.estadoServer;
    var cidade = req.body.cidadeServer;
    var cnpj = req.body.cnpjServer;
    var descricao = req.body.descricaoServer;
    const empresa = req.query.id_empresa;

    if (empresa == undefined) {
        res.status(400).send("empresa está undefined!");
    } else if (nome == undefined) {
        res.status(400).send("nome está undefined!");
    } else if (logradouro == undefined) {
        res.status(400).send("logradouro está undefined!"); 
    } else if (complemento == undefined) {
        res.status(400).send("complemento está undefined!");
    } else if (numero == undefined) {
        res.status(400).send("numero está undefined!"); 
    } else if (bairro == undefined) {
        res.status(400).send("bairro está undefined!");
    } else if (estado == undefined) {
        res.status(400).send("estado está undefined!"); 
    } else if (cidade == undefined) {
        res.status(400).send("cidade está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("cnpj está undefined!"); 
    } else if (descricao == undefined) {
        res.status(400).send("descricao está undefined!");
    } else {
        dadosEmpresaModel.atualizarDadosEmpresa(nome, cep, logradouro, complemento, numero, bairro, estado, cidade, cnpj, descricao, empresa)
            .then((resultado) => {
                res.status(200).json(resultado);
            })
            .catch((erro) => {
                console.log("Houve um erro ao atualizar os dados da empresa: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function mostrarDadosEmpresa(req, res) {
    const empresa = req.query.id_empresa;
    if (empresa == undefined) {
        res.status(400).send("id_empresa está undefined!");
    } else {
        dadosEmpresaModel.mostrarDadosEmpresa(empresa)
            .then((resultado) => {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).json([]); // No content
                }
            })
            .catch((erro) => {
                console.log("Houve um erro ao buscar os dados da empresa: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function desativarEmpresa(req, res) {
    const empresa = req.body.empresaServer;

    if (empresa == undefined) {
        res.status(400).send("id_empresa está undefined!");
    } else {
        dadosEmpresaModel.desativarEmpresa(empresa)
            .then((resultado) => {
                res.status(200).json(resultado);
            })
            .catch((erro) => {
                console.log("Houve um erro ao desativar empresa: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    mostrarDadosEmpresa,
    atualizarDadosEmpresa,
    desativarEmpresa
};