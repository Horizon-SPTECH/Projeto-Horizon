var database = require("../database/config");

function atualizarParametro(id_empresa, limite_baixo, limite_ok, limite_alto) {
    var instrucaoSql = `
        UPDATE parametro
        SET 
            limite_baixo = ${limite_baixo},
            limite_ok = ${limite_ok},
            limite_alto = ${limite_alto},
            data_atualizacao = CURDATE() -- Atualiza para a data atual
        WHERE 
            id_empresa = ${id_empresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function padronizarParametro(id_empresa) {
    var instrucaoSql = `
        UPDATE parametro
        SET 
            limite_baixo = 3,
            limite_ok = 7,
            limite_alto = GREATEST(limite_alto, 8),
            data_atualizacao = CURDATE()
        WHERE 
            id_empresa = ${id_empresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function mostrarParametro(empresa) {
    var instrucaoSql = `
SELECT 
    id,
    limite_baixo,
    limite_ok,
    limite_alto,
    data_atualizacao,
    id_empresa
FROM 
    parametro
WHERE 
    id_empresa = ${empresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    atualizarParametro,
    padronizarParametro,
    mostrarParametro
};
