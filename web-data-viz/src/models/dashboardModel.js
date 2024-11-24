var database = require("../database/config");

function listartMunicipios() {
  var instrucaoSql = `
                      SELECT 
                      m.nome AS municipio,
                      m.habitante AS numero_habitantes,
                      COUNT(f.id) AS numero_furtos,
                      (COUNT(f.id) / (SELECT COUNT(*) FROM furto) * 100) AS porcentagem_furtos
                      FROM 
                          municipio_es as m
                      LEFT JOIN 
                          furto as f ON m.id = f.id_municipio_es
                      GROUP BY 
                          m.id
`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function maisFurto() {
  var instrucaoSql = `
                     SELECT 
                        m.nome AS municipio
                    FROM 
                        municipio_es as m
                    LEFT JOIN 
                        furto as f ON m.id = f.id_municipio_es
                    GROUP BY 
                        m.id
                    ORDER BY 
                        COUNT(f.id) DESC
                    LIMIT 1;
`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function maisFurtoMunicipioPorcentagem() {
  var instrucaoSql = `
                    SELECT 
                        m.nome AS municipio,
                        COUNT(f.id) AS numero_furtos,
                        ROUND((COUNT(f.id) / (SELECT COUNT(*) FROM furto) * 100), 2) AS porcentagem_furtos
                    FROM 
                        municipio_es AS m
                    LEFT JOIN 
                        furto AS f ON m.id = f.id_municipio_es
                    GROUP BY 
                        m.id, m.nome, m.habitante
                    ORDER BY 
                        numero_furtos DESC
                    LIMIT 1;
`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function menosFurto() {
  var instrucaoSql = `
                     SELECT 
                        m.nome AS municipio
                    FROM 
                        municipio_es as m
                    LEFT JOIN 
                        furto as f ON m.id = f.id_municipio_es
                    GROUP BY 
                        m.id
                    ORDER BY 
                        COUNT(f.id) ASC
                    LIMIT 1;
                    `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function menosFurtoMunicipioPorcentagem() {
  var instrucaoSql = `
                   SELECT 
                      m.nome AS municipio,
                      COUNT(f.id) AS numero_furtos,
                      ROUND((COUNT(f.id) / (SELECT COUNT(*) FROM furto) * 100), 2) AS porcentagem_furtos
                  FROM 
                      municipio_es AS m
                  LEFT JOIN 
                      furto AS f ON m.id = f.id_municipio_es
                  GROUP BY 
                      m.id, m.nome, m.habitante
                  ORDER BY 
                      numero_furtos ASC
                  LIMIT 1;
                    `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function furtosPor1kilometro() {
  var instrucaoSql = `
                    SELECT
                    ROUND((COUNT(id)/46.184),0) AS furtos_por_km2
                    FROM furto;
                    `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function objetosMaisRoubados() {
  var instrucaoSql = `
                  SELECT 'CELULAR' AS tipo_objeto, COUNT(*) AS numero_furtos
                  FROM furto
                  WHERE objeto_roubado = 'CELULAR'

                  UNION ALL

                  SELECT 'VEICULO', COUNT(*)
                  FROM furto
                  WHERE objeto_roubado = 'VEICULO'

                  UNION ALL

                  SELECT 'BICICLETA', COUNT(*)
                  FROM furto
                  WHERE objeto_roubado = 'BICICLETA'
                  ORDER BY numero_furtos DESC;
                    `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function mesesGraficos() {
  var instrucaoSql = `
                    SELECT DISTINCT DATE_FORMAT(data, '%M') AS nome_mes
                    FROM furto
                    LIMIT 0, 2000;
                    `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


function furtosMeses() {
  var instrucaoSql = `
                  SELECT COUNT(*) AS total_furtos
                  FROM furto
                  GROUP BY MONTH(data);
                    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function diaSemanaGraficos() {
  var instrucaoSql = `
                SELECT 'Sunday' AS dia_semana
                UNION ALL SELECT 'Monday'
                UNION ALL SELECT 'Tuesday'
                UNION ALL SELECT 'Wednesday'
                UNION ALL SELECT 'Thursday'
                UNION ALL SELECT 'Friday'
                UNION ALL SELECT 'Saturday';
                    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function furtoSemanas() {
  var instrucaoSql = `
              SELECT 
                  COUNT(*) AS numero_furtos
              FROM 
                  furto
              GROUP BY 
                  DAYOFWEEK(data);
                    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function furtosSemanasUnica(municipio) {
  console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function furtosSemanasUnica()");
  var instrucao = `
                      SELECT     
                          dias.dia_da_semana,
                          COALESCE(resultados.total_furtos, 0) AS total_furtos
                      FROM (
                          SELECT 'Sunday' AS dia_da_semana
                          UNION ALL SELECT 'Monday'
                          UNION ALL SELECT 'Tuesday'
                          UNION ALL SELECT 'Wednesday'
                          UNION ALL SELECT 'Thursday'
                          UNION ALL SELECT 'Friday'
                          UNION ALL SELECT 'Saturday'
                      ) AS dias
                      LEFT JOIN (
                          SELECT 
                              DAYNAME(f.data) AS dia_da_semana,
                              COUNT(*) AS total_furtos
                          FROM 
                              furto f
                          JOIN 
                              municipio_es m ON f.id_municipio_es = m.id
                          WHERE 
                              m.nome = '${municipio}'
                          GROUP BY 
                              DAYNAME(f.data)
                      ) AS resultados
                      ON dias.dia_da_semana = resultados.dia_da_semana
                      ORDER BY 
                          FIELD(dias.dia_da_semana, 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function furtosMesesUnica(municipio) {
  console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function furtosSemanasUnica()");
  var instrucao = `
                  SELECT 
                      meses.mes AS mes,
                      COALESCE(resultados.total_furtos, 0) AS total_furtos
                  FROM (
                      SELECT 'January' AS mes
                      UNION ALL SELECT 'February'
                      UNION ALL SELECT 'March'
                      UNION ALL SELECT 'April'
                      UNION ALL SELECT 'May'
                      UNION ALL SELECT 'June'
                      UNION ALL SELECT 'July'
                  ) AS meses
                  LEFT JOIN (
                      SELECT 
                          MONTHNAME(f.data) AS mes,
                          COUNT(*) AS total_furtos
                      FROM 
                          furto f
                      JOIN 
                          municipio_es m ON f.id_municipio_es = m.id
                      WHERE 
                          m.nome = '${municipio}'
                      GROUP BY 
                          MONTHNAME(f.data)
                  ) AS resultados
                  ON meses.mes = resultados.mes
                  ORDER BY 
                      FIELD(meses.mes, 'January', 'February', 'March', 'April', 'May', 'June', 'July');
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}


function furtosIndi(municipio) {
  console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function furtosSemanasUnica()");
  var instrucao = `
                        SELECT 
                          m.nome AS municipio,
                          COUNT(f.id) AS total_furtos
                      FROM 
                          furto f
                      JOIN 
                          municipio_es m ON f.id_municipio_es = m.id
                      WHERE 
                          m.nome = '${municipio}'
                      GROUP BY 
                          m.nome;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function objetosMaisRoubadosIndi(municipio) {
  console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function furtosSemanasUnica()");
  var instrucao = `
                  SELECT 'CELULAR' AS tipo_objeto, COUNT(*) AS numero_furtos
                  FROM furto f
                  JOIN municipio_es m ON f.id_municipio_es = m.id
                  WHERE objeto_roubado = 'CELULAR' AND m.nome = '${municipio}'

                  UNION ALL

                  SELECT 'VEICULO', COUNT(*)
                  FROM furto f
                  JOIN municipio_es m ON f.id_municipio_es = m.id
                  WHERE objeto_roubado = 'VEICULO' AND m.nome = '${municipio}'

                  UNION ALL

                  SELECT 'BICICLETA', COUNT(*)
                  FROM furto f
                  JOIN municipio_es m ON f.id_municipio_es = m.id
                  WHERE objeto_roubado = 'BICICLETA' AND m.nome = '${municipio}'

                  ORDER BY numero_furtos DESC;

  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function porcentualFurtos(municipio) {
  console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function furtosSemanasUnica()");
  var instrucao = `
                  WITH meses AS (
                      SELECT 1 AS mes_numero, 'Janeiro' AS mes_nome
                      UNION ALL SELECT 2, 'Fevereiro'
                      UNION ALL SELECT 3, 'Março'
                      UNION ALL SELECT 4, 'Abril'
                      UNION ALL SELECT 5, 'Maio'
                      UNION ALL SELECT 6, 'Junho'
                      UNION ALL SELECT 7, 'Julho'
                  ),
                  furtos AS (
                      SELECT 
                          MONTH(f.data) AS mes_numero,
                          COUNT(*) AS total_furtos
                      FROM 
                          furto f
                      JOIN 
                          municipio_es m ON f.id_municipio_es = m.id
                      WHERE 
                          m.nome = '${municipio}'
                      GROUP BY 
                          MONTH(f.data)
                  ),
                  furtos_completos AS (
                      SELECT 
                          meses.mes_nome,
                          meses.mes_numero,
                          COALESCE(furtos.total_furtos, 0) AS total_furtos
                      FROM 
                          meses
                      LEFT JOIN 
                          furtos ON meses.mes_numero = furtos.mes_numero
                  ),
                  furtos_com_percentual AS (
                      SELECT 
                          mes_nome,
                          mes_numero,
                          total_furtos,
                          LAG(total_furtos) OVER (ORDER BY mes_numero) AS furtos_mes_anterior,
                          CASE 
                              WHEN LAG(total_furtos) OVER (ORDER BY mes_numero) IS NOT NULL THEN 
                                  ROUND(((total_furtos - LAG(total_furtos) OVER (ORDER BY mes_numero)) 
                                  / LAG(total_furtos) OVER (ORDER BY mes_numero)) * 100, 2)
                              ELSE NULL
                          END AS percentual_variacao
                      FROM 
                          furtos_completos
                  )
                  SELECT 
                      mes_nome,
                      total_furtos,
                      COALESCE(percentual_variacao, 0) AS percentual_variacao
                  FROM 
                      furtos_com_percentual
                  ORDER BY 
                      mes_numero;

  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function parametrosEmpresa(idEMpresa) {
  console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function furtosSemanasUnica()");
  var instrucao = `
                  SELECT limite_baixo, limite_ok, limite_alto, data_atualizacao
                  FROM parametro
                  WHERE id_empresa = ${idEMpresa};
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}



module.exports = {
  listartMunicipios,
  maisFurto,
  maisFurtoMunicipioPorcentagem,
  menosFurto,
  menosFurtoMunicipioPorcentagem,
  furtosPor1kilometro,
  objetosMaisRoubados,
  mesesGraficos,
  furtosMeses,
  diaSemanaGraficos,
  furtoSemanas,
  furtosSemanasUnica,
  furtosMesesUnica,
  furtosIndi,
  objetosMaisRoubadosIndi,
  porcentualFurtos,
  parametrosEmpresa
  };
