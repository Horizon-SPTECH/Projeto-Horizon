-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Empresa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Empresa` (
  `idEmpresa` INT NOT NULL,
  `NomeEmpresa` VARCHAR(45) NULL,
  `Email` VARCHAR(45) NULL,
  `CEP` VARCHAR(9) NULL,
  `CNPJ` VARCHAR(14) NULL,
  `Endereço` VARCHAR(45) NULL,
  `Numero` VARCHAR(45) NULL,
  `TipoEmpresa` VARCHAR(45) NULL,
  PRIMARY KEY (`idEmpresa`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Usuario` (
  `idUsuario` INT NOT NULL,
  `idEmpresa` INT NOT NULL,
  `idGerente` INT NOT NULL,
  `Nome` VARCHAR(45) NULL,
  `Email` VARCHAR(60) NULL,
  `Telefone` VARCHAR(11) NULL,
  `Permissão` VARCHAR(45) NULL,
  `CPF` VARCHAR(11) NULL,
  `Senha` VARCHAR(45) NULL,
  PRIMARY KEY (`idUsuario`),
  INDEX `fk_Usuario_Empresa_idx` (`idEmpresa` ASC) VISIBLE,
  INDEX `fk_Usuario_Usuario1_idx` (`idGerente` ASC) VISIBLE,
  CONSTRAINT `fk_Usuario_Empresa`
    FOREIGN KEY (`idEmpresa`)
    REFERENCES `mydb`.`Empresa` (`idEmpresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Usuario_Usuario1`
    FOREIGN KEY (`idGerente`)
    REFERENCES `mydb`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`dados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`dados` (
  `idDados` INT NOT NULL AUTO_INCREMENT,
  `DataFurto` VARCHAR(45) NOT NULL,
  `horario` TIME NOT NULL,
  `tipoObjeto` VARCHAR(255) NOT NULL,
  `municipio` VARCHAR(45) NOT NULL,
  `PeriodoDia` VARCHAR(45) NULL,
  PRIMARY KEY (`idDados`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Avisos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Avisos` (
  `IdUsuario` INT NOT NULL,
  `idMensagem` INT NOT NULL,
  `Descrição` VARCHAR(45) NULL,
  INDEX `fk_Avisos_Usuario1_idx` (`IdUsuario` ASC) VISIBLE,
  PRIMARY KEY (`idMensagem`),
  CONSTRAINT `fk_Avisos_Usuario1`
    FOREIGN KEY (`IdUsuario`)
    REFERENCES `mydb`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`populacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`populacao` (
  `idMunicipio` INT NOT NULL AUTO_INCREMENT,
  `Municipio` VARCHAR(255) NOT NULL,
  `Populacao` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idMunicipio`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Mensagens`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Mensagens` (
  `idMensagens` INT NOT NULL,
  `Data` DATE NULL,
  `Horario` VARCHAR(45) NULL,
  `Mensagem` VARCHAR(100) NULL,
  `IdUsuario` INT NOT NULL,
  PRIMARY KEY (`idMensagens`),
  INDEX `fk_Mensagens_Usuario1_idx` (`IdUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_Mensagens_Usuario1`
    FOREIGN KEY (`IdUsuario`)
    REFERENCES `mydb`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;