var usuarioModel = require("../models/usuarioModel");
const crypto = require("crypto");
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    host:"smtp-relay.gmail.com",
    service: 'gmail',
    port:587,
    auth: {
        user: 'horizonContateNos@gmail.com',
        pass: 'wxfg vjdw ybis qlmg'
    }
});

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
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var fkEmpresa = req.body.idEmpresaVincularServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Sua empresa a vincular está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha, fkEmpresa)
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

function listarFuncionarios(req, res) {

    var idEMpresa = req.params.idEMpresa

    usuarioModel.listarFuncionarios(idEMpresa).then(function (resultado) {
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




function desativarUsuario(req, res){
    var idUser = req.params.idUser;

    usuarioModel.desativarUsuario(idUser)
    .then(
        function(resultado){
            res.json(resultado);
        }
    )
    .catch(
        function(erro){
            console.log(erro);
            console.log("ERRO ao atualizar com put", erro.sqlMessage)
            res.status(500).json(erro.sqlMessage);
        }
    )
}





function gerarToken(req, res) {
    const email = req.body.emailServer;

    if (!email) {
        res.status(400).send("Email não informado!");
        return;
    }

    usuarioModel.buscarPorEmail(email).then((resultado) => {
        if (resultado.length === 0) {
          res.status(404).send("Email não encontrado!");
        } else {
          const token = crypto.randomBytes(64).toString("hex");
    
          usuarioModel.salvarToken(email, token).then(() => {
            let mailOptions = {
              from: 'horizonContateNos@gmail.com', 
              to: email,
              subject: 'Recuperação de Senha - Token', 
              text: `Olá, você solicitou a recuperação de senha. Use o seguinte token para prosseguir: ${token}`, 
            };
    
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error("Erro ao enviar e-mail:", error);
                res.status(500).send("Erro ao enviar o e-mail com o token.");
                return;
              }
              console.log('E-mail enviado:', info.response);
              res.status(200).send(`Token gerado e enviado para o e-mail: ${email}`);
            });
          }).catch((erro) => {
            res.status(500).send("Erro ao salvar token.");
            console.error(erro);
          });
        }
      }).catch((erro) => {
        res.status(500).send("Erro ao buscar email no banco.");
        console.error(erro);
      });
}

function verificarToken(req, res) {
    const token = req.body.tokenServer;

    if (!token) {
        res.status(400).send("Token não informado!");
        return;
    }

    usuarioModel.verificarToken(token).then((resultado) => {
        if (resultado.length === 0) {
            res.status(404).send("Token inválido ou expirado!");
        } else {
            res.status(200).send("Token válido! Redirecionando para alteração de senha...");
        }
    }).catch((erro) => {
        res.status(500).send("Erro ao verificar token no banco.");
        console.error(erro);
    });
}

function alterarSenha(req, res) {
    const { tokenServer: token, senhaNovaServer: novaSenha } = req.body;

    if (!token || !novaSenha) {
        res.status(400).send("Token ou nova senha não informados!");
        return;
    }

    usuarioModel.verificarToken(token).then((resultado) => {
        if (resultado.length === 0) {
            res.status(404).send("Token inválido ou expirado!");
        } else {
            usuarioModel.alterarSenha(resultado[0].email, novaSenha).then(() => {
                const novoToken = crypto.randomBytes(64).toString("hex");
                usuarioModel.salvarToken(resultado[0].email, novoToken).then(() => {
                    res.status(200).send("Senha alterada com sucesso!");
                }).catch((erro) => {
                    res.status(500).send("Erro ao salvar novo token no banco.");
                    console.error(erro);
                });
            }).catch((erro) => {
                res.status(500).send("Erro ao alterar senha.");
                console.error(erro);
            });
        }
    }).catch((erro) => {
        res.status(500).send("Erro ao verificar token.");
        console.error(erro);
    });
}

module.exports = {
    autenticar,
    cadastrar,
    listarFuncionarios,
    desativarUsuario,
    gerarToken,
    verificarToken,
    alterarSenha
}