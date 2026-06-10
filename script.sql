CREATE DATABASE IF NOT EXISTS inspecciones_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE inspecciones_db;

-- 1. EMPRESA
CREATE TABLE empresa (
  id_empresa INT AUTO_INCREMENT PRIMARY KEY,
  nombre     VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- 2. FORMULARIO
CREATE TABLE formulario (
  id_formulario INT AUTO_INCREMENT PRIMARY KEY,
  nombre        VARCHAR(100) NOT NULL,
  revision      INT NOT NULL,
  activo        TINYINT(1) NOT NULL DEFAULT 1,
  CONSTRAINT uq_nombre_revision UNIQUE (nombre, revision)
) ENGINE=InnoDB;

-- 3. CATEGORIA
CREATE TABLE categoria (
  id_categoria  INT AUTO_INCREMENT PRIMARY KEY,
  titulo        VARCHAR(150) NOT NULL,
  orden         INT NOT NULL,
  id_formulario INT NOT NULL,
  CONSTRAINT fk_categoria_formulario
    FOREIGN KEY (id_formulario) REFERENCES formulario(id_formulario)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 4. PREGUNTA
CREATE TABLE pregunta (
  id_pregunta  INT AUTO_INCREMENT PRIMARY KEY,
  texto        VARCHAR(255) NOT NULL,
  orden        INT NOT NULL,
  id_categoria INT NOT NULL,
  CONSTRAINT fk_pregunta_categoria
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 5. INSPECCION
CREATE TABLE inspeccion (
  id_inspeccion INT AUTO_INCREMENT PRIMARY KEY,
  fecha         DATE NOT NULL,
  id_empresa    INT NOT NULL,
  id_formulario INT NOT NULL,
  CONSTRAINT fk_inspeccion_empresa
    FOREIGN KEY (id_empresa) REFERENCES empresa(id_empresa)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT fk_inspeccion_formulario
    FOREIGN KEY (id_formulario) REFERENCES formulario(id_formulario)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 6. RESPUESTA
CREATE TABLE respuesta (
  id_respuesta  INT AUTO_INCREMENT PRIMARY KEY,
  respuesta     ENUM('Cumple', 'No cumple', 'N/A') NOT NULL,
  imagen        VARCHAR(255) NULL,
  id_pregunta   INT NOT NULL,
  id_inspeccion INT NOT NULL,
  CONSTRAINT fk_respuesta_pregunta
    FOREIGN KEY (id_pregunta) REFERENCES pregunta(id_pregunta)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT fk_respuesta_inspeccion
    FOREIGN KEY (id_inspeccion) REFERENCES inspeccion(id_inspeccion)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT uq_inspeccion_pregunta UNIQUE (id_inspeccion, id_pregunta)
) ENGINE=InnoDB;