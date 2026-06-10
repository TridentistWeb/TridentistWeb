-- =============================================================================
-- SCRIPT DE CREACIÓN DE BASE DE DATOS - TRIDENTIST
-- Curso: Entorno Actual de Aprendizaje / Ingeniería de Software - UTP
-- =============================================================================

CREATE DATABASE IF NOT EXISTS tridentist_db;
USE tridentist_db;

-- 1. Tabla: Administrador
CREATE TABLE IF NOT EXISTS Administrador (
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    DNI VARCHAR(8) NOT NULL UNIQUE,
    Nombres VARCHAR(100) NOT NULL,
    Apellidos VARCHAR(100) NOT NULL,
    Celular VARCHAR(15),
    Email VARCHAR(100),
    password VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Tabla: Paciente
CREATE TABLE IF NOT EXISTS Paciente (
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    DNI VARCHAR(8) NOT NULL UNIQUE,
    Nombres VARCHAR(100) NOT NULL,
    Apellidos VARCHAR(100) NOT NULL,
    Celular VARCHAR(15),
    Email VARCHAR(100),
    password VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Tabla: Doctores
CREATE TABLE IF NOT EXISTS Doctores (
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    DNI VARCHAR(8) NOT NULL UNIQUE,
    Nombres VARCHAR(100) NOT NULL,
    Apellidos VARCHAR(100) NOT NULL,
    Especialidad VARCHAR(50) NOT NULL,
    Celular VARCHAR(15),
    Email VARCHAR(100),
    password VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Tabla: Tratamientos
CREATE TABLE IF NOT EXISTS Tratamientos (
    id_tratamiento INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL,
    precio DECIMAL(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Tabla: Citas
CREATE TABLE IF NOT EXISTS Citas (
    id_cita INT AUTO_INCREMENT PRIMARY KEY,
    fecha_hora DATETIME NOT NULL,
    codigo_paciente INT NOT NULL,
    codigo_doctor INT NOT NULL,
    id_tratamiento INT NOT NULL,
    estado VARCHAR(20) DEFAULT 'Pendiente',
    CONSTRAINT fk_citas_paciente FOREIGN KEY (codigo_paciente) REFERENCES Paciente(codigo) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_citas_doctor FOREIGN KEY (codigo_doctor) REFERENCES Doctores(codigo) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_citas_tratamiento FOREIGN KEY (id_tratamiento) REFERENCES Tratamientos(id_tratamiento) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Tabla: Boleta
CREATE TABLE IF NOT EXISTS Boleta (
    numero_boleta INT AUTO_INCREMENT PRIMARY KEY,
    fecha_emision DATETIME NOT NULL,
    codigo_paciente INT NOT NULL,
    total DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    CONSTRAINT fk_boleta_paciente FOREIGN KEY (codigo_paciente) REFERENCES Paciente(codigo) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Tabla: Detalle_Boleta
CREATE TABLE IF NOT EXISTS Detalle_Boleta (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    numero_boleta INT NOT NULL,
    id_tratamiento INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    precio_unitario DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_detalle_boleta FOREIGN KEY (numero_boleta) REFERENCES Boleta(numero_boleta) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_detalle_tratamiento FOREIGN KEY (id_tratamiento) REFERENCES Tratamientos(id_tratamiento) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================================================================
-- INSERCIÓN DE DATOS DE PRUEBA (OPCIONAL)
-- =============================================================================
INSERT INTO Tratamientos (descripcion, precio) VALUES 
('Profilaxis Dental Completa', 120.00),
('Curación Dental con Resina', 90.00),
('Endodoncia Premolar', 350.00),
('Blanqueamiento LED', 450.00);
