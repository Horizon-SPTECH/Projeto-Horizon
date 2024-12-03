var database = require("../database/config");

function atualizarParametro(id_empresa, limite_baixo, limite_ok) {
    var instrucaoSql = `
        UPDATE parametro
        SET 
            limite_baixo = ${limite_baixo},
            limite_ok = ${limite_ok},
            data_atualizacao = CURDATE()
        WHERE 
            id_empresa = ${id_empresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function padronizarParametro(empresa) {
    var instrucaoSql = `
        UPDATE parametro
        SET 
            limite_baixo = 2,
            limite_ok = 6,
            limite_alto = 100,
            data_atualizacao = CURDATE()
        WHERE 
            id_empresa = ${empresa};
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
