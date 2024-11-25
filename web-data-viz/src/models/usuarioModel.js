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
function cadastrar(nomeEmpresa, cnpj, cep, enderecoEmpresa, numeroEmpresa, nome, cpf, telefone, email, senha) {
    // console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeEmpresa, cnpj, cep, enderecoEmpresa, numeroEmpresa, nome, cpf, telefone, email, senha);
    
    var instrucaoSql = `
    INSERT INTO tipo_empresa (descricao) VALUES ('PUBLICO');

    INSERT INTO endereco (logradouro, numero, bairro, cidade, estado, cep) 
    VALUES ('${enderecoEmpresa}', '${numeroEmpresa}', 'TUPINIQUUIN', 'BARREIRACLASH', 'ESPIRITO SANTO', '${cep}');

    INSERT INTO empresa (nome, cnpj, ativo, id_tipo_empresa, id_endereco) 
    SELECT '${nomeEmpresa}' AS nome, 
           '${cnpj}' AS cnpj, 
           '1' AS ativo, 
           MAX(tipo_empresa.id) AS id_tipo_empresa,
           MAX(endereco.id) AS id_endereco
    FROM tipo_empresa, endereco;

    -- Inserir o registro na tabela 'parametro' com o último ID de 'empresa'
    INSERT INTO parametro (limite_baixo, limite_ok, limite_alto, data_atualizacao, id_empresa) 
    SELECT '10' AS limite_baixo, 
           '20' AS limite_ok, 
           '30' AS limite_alto, 
           CURDATE() AS data_atualizacao,
           MAX(empresa.id) AS id_empresa
    FROM empresa;

    INSERT INTO tipo_usuario (cargo) VALUES ('GESTOR');

    INSERT INTO usuario (nome, cpf, email, senha, ativo, id_tipo_usuario, id_empresa) 
    SELECT '${nome}' AS nome, 
           '${cpf}' AS cpf, 
           '${email}' AS email, 
           '${senha}' AS senha, 
           '1' AS ativo, 
           '1' AS id_tipo_usuario,
           MAX(empresa.id) AS id_empresa
    FROM empresa;

    INSERT INTO tipo_telefone (nome) VALUES ('PESSOAL'), ('COMERCIAL'), ('RESIDENCIAL');

    INSERT INTO telefone (numero, id_tipo_telefone, id_usuario) 
    SELECT '${telefone}' AS numero,
           1 AS id_tipo_telefone,
           MAX(usuario.id) AS id_usuario
    FROM usuario;
`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar
};