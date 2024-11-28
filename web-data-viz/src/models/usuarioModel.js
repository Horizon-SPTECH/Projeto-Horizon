var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `        
        SELECT 
            u.id, 
            u.nome, 
            u.email, 
            u.ativo,
            u.cpf, 
            u.senha, 
            u.id_empresa, 
            u.id_tipo_usuario,
            e.ativo AS empresa_ativo
        FROM 
            usuario u
        INNER JOIN 
            empresa e ON u.id_empresa = e.id
        WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, cpf, senha, idTipoUsuario, idEmpresa, telefone) {
    // Primeira instrução: inserir dados do usuário
    var instrucaoUsuario =
        ` INSERT INTO usuario (nome, email, ativo, cpf, senha, id_tipo_usuario, id_empresa) VALUES ('${nome}', '${email}', 1, '${cpf}',  '${senha}', '${idTipoUsuario}', '${idEmpresa}');`
        ;

    // Segunda instrução: inserir o telefone associado ao último usuário inserido
    var instrucaoTelefone =
        ` INSERT INTO telefone (numero, id_tipo_telefone, id_usuario) 
        SELECT '${telefone}' AS numero,
               1 AS id_tipo_telefone,
               MAX(id) AS id_usuario
        FROM usuario;`
        ;

    console.log("Executando a instrução SQL para usuário: \n" + instrucaoUsuario);
    console.log("Executando a instrução SQL para telefone: \n" + instrucaoTelefone);

    // Executar ambas as instruções em sequência
    return database.executar(instrucaoUsuario)
        .then(() => {
            return database.executar(instrucaoTelefone);
        })
        .catch((erro) => {
            console.error("Erro ao executar as instruções SQL:", erro);
            throw erro;
        });
}

function listarFuncionarios(idEMpresa) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function furtosSemanasUnica()");
    var instrucao = `
                    SELECT 
                        u.id as id,
                        u.nome AS nome,
                        u.email AS email,
                        u.ativo AS usuario_ativo,
                        u.cpf AS cpf,
                        tu.cargo AS tipo_usuario_cargo,
                        t.numero AS telefone
                    FROM 
                        usuario u
                    JOIN 
                        tipo_usuario tu ON u.id_tipo_usuario = tu.id
                    LEFT JOIN 
                        telefone t ON u.id = t.id_usuario
                    LEFT JOIN 
                        tipo_telefone tt ON t.id_tipo_telefone = tt.id
                    WHERE 
                        u.id_empresa = ${idEMpresa}
                    ORDER BY usuario_ativo DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
  }


  function desativarUsuario(idUser) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function furtosSemanasUnica()");
    var instrucao = `
                   UPDATE usuario SET ativo = 0 where id = ${idUser};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
  }

  function buscarPorEmail(email) {
    const instrucaoSql = `SELECT * FROM usuario WHERE email = '${email}';`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function salvarToken(email, token) {
    const instrucaoSql = `UPDATE usuario SET token = '${token}' WHERE email = '${email}';`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function verificarToken(token) {
    const instrucaoSql = `SELECT * FROM usuario WHERE token = '${token}';`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function alterarSenha(email, novaSenha) {
    const instrucaoSql = `UPDATE usuario SET senha = '${novaSenha}' WHERE email = '${email}';`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function perfilUsuario(idUsuario) {

    var instrucaoSql = `
        SELECT 
    u.id AS usuario_id,
    u.nome AS nome_usuario,
    u.email AS email_usuario,
    u.ativo AS usuario_ativo,
    u.cpf AS cpf_usuario,
    u.senha AS senha_usuario,
    t.numero AS telefone_usuario,
    tu.cargo AS cargo_usuario
FROM 
    usuario u
LEFT JOIN 
    telefone t ON u.id = t.id_usuario
LEFT JOIN 
    tipo_telefone tt ON t.id_tipo_telefone = tt.id
LEFT JOIN 
    empresa e ON u.id_empresa = e.id
LEFT JOIN 
    tipo_empresa te ON e.id_tipo_empresa = te.id
LEFT JOIN 
    tipo_usuario tu ON u.id_tipo_usuario = tu.id
WHERE 
    u.id = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function desativarFuncionario(idUsuario) {

    var instrucao =
        `UPDATE usuario SET ativo = 0 where id = ${idUsuario};`
        ;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarUsuario(email, senha, idUsuario, telefone) {

    var instrucaoUsuario =
        ` UPDATE usuario SET email = '${email}', senha = '${senha}' WHERE id = '${idUsuario}'`;

    // Segunda instrução: inserir o telefone associado ao último usuário inserido
    var instrucaoTelefone =
        ` UPDATE telefone SET numero = '${telefone}' WHERE id_usuario = '${idUsuario}'`;

    console.log("Executando a instrução SQL para usuário: \n" + instrucaoUsuario);
    console.log("Executando a instrução SQL para telefone: \n" + instrucaoTelefone);

    // Executar ambas as instruções em sequência
    return database.executar(instrucaoUsuario)
        .then(() => {
            return database.executar(instrucaoTelefone);
        })
        .catch((erro) => {
            console.error("Erro ao executar as instruções SQL:", erro);
            throw erro;
        });
}

function verificarSenha(idUsuario) {
    
    var instrucaoSql = `
        SELECT senha FROM usuario WHERE id = '${idUsuario}' ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarRespo(nomeEmpresa, cnpj, cep, enderecoEmpresa,complementoEmpresa,bairroEmpresa,cidadeEmpresa,estadoEmpresa, numeroEmpresa, nome, cpf, telefone, email, senha) {
    var instrucaoEndereco = `
        INSERT INTO endereco (logradouro, numero, complemento, bairro, cidade, estado, cep) 
        VALUES ('${enderecoEmpresa}', '${numeroEmpresa}', '${complementoEmpresa}', '${bairroEmpresa}', '${cidadeEmpresa}', '${estadoEmpresa}', '${cep}');
    `;

        var instrucaoEmpresa = `
        INSERT INTO empresa (nome, cnpj, ativo, id_tipo_empresa, id_endereco) 
        SELECT '${nomeEmpresa}' AS nome, 
               '${cnpj}' AS cnpj, 
               1 AS ativo, 
               MAX(tipo_empresa.id) AS id_tipo_empresa,
               MAX(endereco.id) AS id_endereco
        FROM tipo_empresa, endereco;
    `;

    var instrucaoUsuario = `
        INSERT INTO usuario (nome, cpf, email, senha, ativo, id_tipo_usuario, id_empresa) 
        SELECT '${nome}' AS nome, 
               '${cpf}' AS cpf, 
               '${email}' AS email, 
               '${senha}' AS senha, 
               1 AS ativo, 
               2 AS id_tipo_usuario,
               MAX(empresa.id) AS id_empresa
        FROM empresa;
    `;

    var instrucaoTelefone = `
        INSERT INTO telefone (numero, id_tipo_telefone, id_usuario) 
        SELECT '${telefone}' AS numero,
               1 AS id_tipo_telefone,
               MAX(usuario.id) AS id_usuario
        FROM usuario;
    `;

    console.log("Executando a instrução SQL para endereço: \n" + instrucaoEndereco);
    return database.executar(instrucaoEndereco)
        .then(() => {
            console.log("Executando a instrução SQL para empresa: \n" + instrucaoEmpresa);
            return database.executar(instrucaoEmpresa);
        })
        .then(() => {
            console.log("Executando a instrução SQL para usuário: \n" + instrucaoUsuario);
            return database.executar(instrucaoUsuario);
        })
        .then(() => {
            console.log("Executando a instrução SQL para telefone: \n" + instrucaoTelefone);
            return database.executar(instrucaoTelefone);
        })
        .catch((erro) => {
            console.error("Erro ao executar as instruções SQL:", erro);
            throw erro;
        });
}

module.exports = {
    autenticar,
    cadastrar,
    listarFuncionarios,
    desativarUsuario,
    buscarPorEmail,
    salvarToken,
    verificarToken,
    alterarSenha,
    perfilUsuario,
    desativarFuncionario,
    atualizarUsuario,
    verificarSenha,
    cadastrarRespo
};