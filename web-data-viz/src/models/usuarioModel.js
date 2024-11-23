var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT id, nome, email, ativo, cpf, senha, id_empresa, id_tipo_usuario FROM usuario WHERE email = '${email}' AND senha = '${senha}';
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

module.exports = {
    autenticar,
    cadastrar
};