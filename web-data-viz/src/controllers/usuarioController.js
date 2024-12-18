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
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
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
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var idTipoUsuario = req.body.idTipoUsuarioServer;
    var idEmpresa = req.body.idEmpresaServer;
    var telefone = req.body.telefoneServer;
    var cpf = req.body.cpfServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (idTipoUsuario == undefined) {
        res.status(400).send("Seu tipo do usuário está undefined!");
    } else if (idEmpresa == undefined){
        res.status(400).send("Sua empresa está undefined!");
    }else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    }else if (cpf == undefined){
        res.status(400).send("Seu cpf está undefined!");
    }else{

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, cpf, senha, idTipoUsuario, idEmpresa, telefone)
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


function cadastrarRespo(req, res) {
    
    var nomeEmpresa     = req.body.nomeEmpresaServer;
    var cnpjEmpresa     = req.body.cnpjEmpresaServer;
    var cepEmpresa      = req.body.cepEmpresaServer;
    var enderecoEmpresa = req.body.enderecoEmpresaServer;
    var complementoEmpresa      = req.body.complementoServer;
    var bairroEmpresa = req.body.bairroServer;
    var cidadeEmpresa      = req.body.cidadeServer;
    var estadoEmpresa = req.body.estadoServer;
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
    }
    else if (complementoEmpresa == undefined) {
        res.status(400).send("Seu endereco a vincular está undefined!");
    }
    else if (bairroEmpresa == undefined) {
        res.status(400).send("Seu endereco a vincular está undefined!");
    }
    else if (cidadeEmpresa == undefined) {
        res.status(400).send("Seu endereco a vincular está undefined!");
    }
    else if (estadoEmpresa == undefined) {
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
        usuarioModel.cadastrarRespo(nomeEmpresa, cnpjEmpresa, cepEmpresa, enderecoEmpresa,complementoEmpresa,bairroEmpresa,cidadeEmpresa,estadoEmpresa, numeroEmpresa, nome, cpf, telefone, email, senha, confSenha)
            .then(function (resultado) {
                res.json(resultado);
            }).catch(async function (erro) {
                if (erro.code === "ER_DUP_ENTRY") {
                    // Identificar qual campo causou o erro (baseado na mensagem SQL)
                    const campoDuplicado = erro.sqlMessage.match(/for key '(.+?)'/)[1];
                    let mensagemErro = "Erro: ";
                    if (campoDuplicado.includes("cpf")) {
                        // Verificar também o CNPJ
                        const resultadoCnpj = await database.executar(`
                            SELECT COUNT(*) AS duplicado 
                            FROM empresa 
                            WHERE cnpj = '${req.body.cnpjEmpresaServer}'
                        `);

                        if (resultadoCnpj[0].duplicado > 0) {
                            mensagemErro += "CNPJ e CPF já cadastrados.";
                        } else {
                            mensagemErro += "CPF já cadastrado.";
                        }
                    } else if (campoDuplicado.includes("cnpj")) {
                        // Verificar também o CPF
                        const resultadoCpf = await database.executar(`
                            SELECT COUNT(*) AS duplicado 
                            FROM usuario 
                            WHERE cpf = '${req.body.cpfServer}'
                        `);

                        if (resultadoCpf[0].duplicado > 0) {
                            mensagemErro += "CNPJ e CPF já cadastrados.";
                        } else {
                            mensagemErro += "CNPJ já cadastrado.";
                        }
                    } else {
                        mensagemErro += "Email já cadastrado";
                    }
                    res.status(409).send(mensagemErro); // 409 -> Conflito
                } else {
                    console.error("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            });
    }
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

function perfilUsuario(req, res) {
    var idUsuario = req.params.idUsuario
  
    usuarioModel.perfilUsuario(idUsuario).then(function (resultado) {
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

  function desativarFuncionario(req, res) {
    var idUsuario = req.params.idUsuario
  
    usuarioModel.desativarFuncionario(idUsuario).then(function (resultado) {
       res.json(resultado);
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar a quantidade de avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
  }

  function atualizarUsuario(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var idUsuario = req.body.idUsuarioServer;
    var telefone = req.body.telefoneServer;

    // Faça as validações dos valores
     if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (idUsuario == undefined) {
        res.status(400).send("Seu tipo do usuário está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else{

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.atualizarUsuario(email, senha, idUsuario, telefone)
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

function verificarSenha(req, res) {
    var idUsuario = req.params.idUsuario

    usuarioModel.verificarSenha(idUsuario).then(function (resultado) {
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
    autenticar,
    cadastrar,
    listarFuncionarios,
    desativarUsuario,
    gerarToken,
    verificarToken,
    alterarSenha,
    perfilUsuario,
    desativarFuncionario,
    atualizarUsuario,
    verificarSenha,
    cadastrarRespo
}