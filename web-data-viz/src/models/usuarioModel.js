var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT id, nome, email, fk_empresa as empresaId FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha, fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, fkEmpresa);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha, fk_empresa) VALUES ('${nome}', '${email}', '${senha}', '${fkEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
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


module.exports = {
    autenticar,
    cadastrar,
    listarFuncionarios,
    desativarUsuario,
    buscarPorEmail,
    salvarToken,
    verificarToken,
    alterarSenha
};