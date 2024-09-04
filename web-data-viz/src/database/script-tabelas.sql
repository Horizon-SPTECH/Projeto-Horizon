-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE horizon;

USE horizon;

CREATE TABLE delegacia(
	id INT PRIMARY KEY AUTO_INCREMENT,
	distrito INT, 
    UF CHAR(2),
	municipio VARCHAR(50)
);


CREATE TABLE empresa (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
    esfera VARCHAR(50) CHECK (esfera IN ('público', 'privado')) ,
	cnpj CHAR(14),
    descricao VARCHAR(150)
);

CREATE TABLE cliente (
	id INT PRIMARY KEY AUTO_INCREMENT,
    cargo VARCHAR(50),
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50),
    CPF CHAR(11),
	fk_empresa INT,
    fk_delegacia INT, -- quando não identificar com uma das 2 ia ser legal usar ifnull
	FOREIGN KEY (fk_empresa) REFERENCES empresa(id),
    FOREIGN KEY (fk_delegacia) REFERENCES delegacia(id)
);

CREATE TABLE ocorrencia(
	id INT PRIMARY KEY AUTO_INCREMENT,
	dataOcorrencia DATE CHECK(ifnull('SEM IDENTIFICAÇÃO')),
	horaOcorrencia TIME CHECK(ifnull('SEM IDENTIFICAÇÃO')),
    objetoFurtado VARCHAR(50) CHECK(ifnull('SEM IDENTIFICAÇÃO')),
    tipoIncidente VARCHAR(50) CHECK(ifnull('SEM IDENTIFICAÇÃO')),
    municipio VARCHAR(50) CHECK(ifnull('SEM IDENTIFICAÇÃO')),
    bairro VARCHAR(50) CHECK(ifnull('SEM IDENTIFICAÇÃO')),
    logradouro VARCHAR(50) CHECK(ifnull('SEM IDENTIFICAÇÃO')),
    tipoLocal VARCHAR(50) CHECK(ifnull('SEM IDENTIFICAÇÃO')),
    tipoObjeto VARCHAR(50) CHECK(ifnull('SEM IDENTIFICAÇÃO')),
    marcaObjeto VARCHAR(50) CHECK(ifnull('SEM IDENTIFICAÇÃO')),
	modeloObjeto VARCHAR(50) CHECK(ifnull('SEM IDENTIFICAÇÃO')),
    corVeiculo VARCHAR(50) CHECK(ifnull('SEM IDENTIFICAÇÃO'))
);

-- exemplos (não inserir por favor)
insert into empresa (nome, descricao, cnpj) values ('Empresa 1', 'Somos uma empresa dedicada à segurança da população', '1234567891234');
insert into delegacia (distrito, UF, municipio) values ('Delegacia 3', 'ES', 'Rio Bananal');
