-- Criação do banco de dados
CREATE SCHEMA IF NOT EXISTS projetoHorizon DEFAULT CHARACTER SET utf8;
USE projetoHorizon;

-- Criação da tabela tipo empresa
CREATE TABLE IF NOT EXISTS tipo_empresa(
  id INT AUTO_INCREMENT PRIMARY KEY,
  descricao VARCHAR(45) NULL
  );
  
-- Criação da tabela endereco
CREATE TABLE IF NOT EXISTS endereco(
  id INT AUTO_INCREMENT PRIMARY KEY ,
  logradouro VARCHAR(150) NOT NULL,
  numero INT NULL,
  complemento VARCHAR(45) NULL,
  bairro VARCHAR(50) NOT NULL,
  cidade VARCHAR(50) NOT NULL,
  estado VARCHAR(45) NOT NULL,
  cep INT NOT NULL);


-- Criação da tabela empresa
CREATE TABLE IF NOT EXISTS empresa(
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(45) NULL,
  cnpj VARCHAR(14) NULL UNIQUE KEY,
  ativo INT NULL,
  id_tipo_empresa INT NOT NULL,
  id_endereco INT NOT NULL,
  CONSTRAINT fk_empresa_tipo_empresa FOREIGN KEY (id_tipo_empresa) REFERENCES tipo_empresa(id),
  CONSTRAINT fk_empresa_endereco FOREIGN KEY (id_endereco) REFERENCES endereco(id)
  );

-- Criação da tabela de parâmetros
CREATE TABLE IF NOT EXISTS parametro(
 id INT AUTO_INCREMENT PRIMARY KEY,
 limite_baixo INT NOT NULL,
 limite_ok INT NOT NULL,
 limite_alto INT NOT NULL,
 data_atualizacao DATE,
 id_empresa INT,
 CONSTRAINT fk_parametro_empresa FOREIGN KEY (id_empresa) REFERENCES empresa(id)
);

-- Criação da tabela cargo
CREATE TABLE IF NOT EXISTS tipo_usuario(
  id INT AUTO_INCREMENT PRIMARY KEY,
  cargo VARCHAR(50) NOT NULL
);

-- Criação da tabela usuario
CREATE TABLE IF NOT EXISTS usuario(
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(60) NOT NULL UNIQUE KEY,
  ativo INT NOT NULL,
  cpf CHAR(11) NOT NULL UNIQUE KEY,
  senha VARCHAR(50) NOT NULL,
  token VARCHAR(150) NULL,
  id_empresa INT NOT NULL,
  id_tipo_usuario INT NOT NULL,
  CONSTRAINT fk_usuario_empresa FOREIGN KEY (id_empresa) REFERENCES empresa(id),
  CONSTRAINT fk_usuario_tipo_usuario FOREIGN KEY (id_tipo_usuario) REFERENCES tipo_usuario (id)
);


-- Criação da tabela tipo telefone
CREATE TABLE IF NOT EXISTS tipo_telefone(
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(45) NOT NULL
   );

-- Criação da tabela Telefone
CREATE TABLE IF NOT EXISTS telefone(
  id INT AUTO_INCREMENT PRIMARY KEY,
  numero VARCHAR(16) NULL UNIQUE KEY,
  id_tipo_telefone INT NOT NULL,
  id_usuario INT NOT NULL,
  CONSTRAINT fk_telefone_tipo_telefone FOREIGN KEY (id_tipo_telefone) REFERENCES tipo_telefone(id),
  CONSTRAINT fk_telefone_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id)
   );

-- Criação da tabela município do Espírito Santo
CREATE TABLE IF NOT EXISTS municipio_es (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  habitante INT NOT NULL
   );

-- Criação da tabela furto
CREATE TABLE IF NOT EXISTS furto (
  id INT AUTO_INCREMENT PRIMARY KEY ,
  data DATE NOT NULL,
  horario TIME NOT NULL,
  objeto_roubado VARCHAR(45) NOT NULL,
  id_municipio_es INT NOT NULL,
  CONSTRAINT fk_furtos_populacao FOREIGN KEY (id_municipio_es) REFERENCES municipio_es (id)
);


-- Criação da tabela de prompt
CREATE TABLE IF NOT EXISTS prompt(
  id INT AUTO_INCREMENT PRIMARY KEY,
  pergunta VARCHAR(45) NOT NULL,
  data_horario DATETIME NOT NULL
   );


-- Criação da tabela de recomendacao
CREATE TABLE IF NOT EXISTS recomendacao(
  id INT AUTO_INCREMENT PRIMARY KEY ,
  data_hora DATETIME NOT NULL,
  mensagem VARCHAR(300) NOT NULL,
  id_prompt INT NOT NULL,
  id_empresa INT NOT NULL,
  CONSTRAINT fk_recomendacao_prompt1 FOREIGN KEY (id_prompt) REFERENCES prompt(id),
  CONSTRAINT fk_recomendacao_empresa1 FOREIGN KEY (id_empresa) REFERENCES empresa(id)
    );


INSERT INTO tipo_usuario (cargo)
VALUES 
('Funcionário'),
('Gestor'),
('Administrador');


INSERT INTO tipo_empresa (descricao) 
VALUES ('PRIVADA'),('PÚBLICO');



INSERT INTO tipo_telefone (nome) VALUES ('PESSOAL'),('COMERCIAL'), ('RESIDENCIAL');

