var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        aquarioModel.buscarAquariosPorEmpresa(resultadoAutenticar[0].empresaId)
                            .then((resultadoAquarios) => {
                                if (resultadoAquarios.length > 0) {
                                    res.json({
                                        id: resultadoAutenticar[0].id,
                                        email: resultadoAutenticar[0].email,
                                        nome: resultadoAutenticar[0].nome,
                                        senha: resultadoAutenticar[0].senha,
                                        aquarios: resultadoAquarios
                                    });
                                } else {
                                    res.status(204).json({ aquarios: [] });
                                }
                            })
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    var nomeEmpresa     = req.body.nomeEmpresaServer;
    var cnpjEmpresa     = req.body.cnpjEmpresaServer;
    var cepEmpresa      = req.body.cepEmpresaServer;
    var enderecoEmpresa = req.body.enderecoEmpresaServer;
    var numeroEmpresa   = req.body.numeroEmpresaServer;

    var nome      = req.body.nomeServer;
    var cpf       = req.body.cpfServer;
    var telefone  = req.body.telefoneServer;
    var email     = req.body.emailServer;
    var senha     = req.body.senhaServer;
    var confSenha = req.body.confSenhaServer;

    // Faça as validações dos valores
    if (nomeEmpresa == undefined) {
        res.status(400).send("Seu nome da empresa está undefined!");
    } else if (cnpjEmpresa == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (cepEmpresa == undefined) {
        res.status(400).send("Seu cep está undefined!");
    } else if (enderecoEmpresa == undefined) {
        res.status(400).send("Seu endereco a vincular está undefined!");
    } else if (numeroEmpresa == undefined) {
        res.status(400).send("Seu numero do endereço a vincular está undefined!");
    } else if (nome == undefined) {
        res.status(400).send("Seu nome a vincular está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu cpf a vincular está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone a vincular está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email a vincular está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha a vincular está undefined!");
    } else if (confSenha == undefined) {
        res.status(400).send("Sua confirmacao de senha a vincular está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nomeEmpresa, cnpjEmpresa, cepEmpresa, enderecoEmpresa, numeroEmpresa, nome, cpf, telefone, email, senha, confSenha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar
}