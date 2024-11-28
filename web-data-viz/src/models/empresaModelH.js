var database = require("../database/config");

function mostrarDadosEmpresa(empresa) {
    var instrucaoSql = `
        SELECT Emp.nome		   AS 'Nome'
	        , End.cep 		   AS 'CEP'
            , End.logradouro   AS 'Logradouro'
            , End.complemento  AS 'Complemento'
            , End.numero	   AS 'Número'
            , End.bairro 	   AS 'Bairro'
            , End.estado 	   AS 'Estado'
            , End.cidade 	   AS 'Cidade'
	        , Emp.cnpj 	       AS 'CNPJ'
            , Tep.descricao    AS 'Tipo de empresa'
        FROM empresa  	  AS Emp
        JOIN endereco 	  AS End ON Emp.id_endereco     = End.id
        JOIN tipo_empresa AS Tep ON Emp.id_tipo_empresa = Tep.id
        WHERE Emp.id = ${empresa};
            `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarDadosEmpresa(nome, cep, logradouro, complemento, numero, bairro, estado, cidade, cnpj, descricao, empresa) {
    var instrucaoSql = `
        UPDATE empresa AS Emp
        JOIN endereco 	  AS End ON Emp.id_endereco     = End.id
        JOIN tipo_empresa AS Tep ON Emp.id_tipo_empresa = Tep.id
        SET Emp.nome		 = '${nome}'		  
          , End.cep 		 = ${cep}   
          , End.logradouro   = '${logradouro}' 
          , End.complemento  = '${complemento}'
          , End.numero	     = ${numero}
          , End.bairro 	     = '${bairro}'
          , End.estado 	     = '${estado}'
          , End.cidade 	     = '${cidade}'
          , Emp.cnpj 	     = ${cnpj}
          , Tep.descricao    = '${descricao}'
        WHERE Emp.id = ${empresa};
            `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function desativarEmpresa(empresa) {
    var instrucaoSql = `
        UPDATE empresa
        SET ativo = 0
        WHERE 
            id = ${empresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    mostrarDadosEmpresa,
    atualizarDadosEmpresa,
    desativarEmpresa
};