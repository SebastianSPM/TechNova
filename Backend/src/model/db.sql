CREATE DATABASE technova;
USE technova;

CREATE TABLE Products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  price FLOAT,
  nameProduct VARCHAR(255)
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  token VARCHAR(255) NOT NULL
);

-- Inserta un usuario con password en texto plano (para demo, luego usar bcrypt)
INSERT INTO users (username, password, token) VALUES ('admin', '123456', 'mi-token-secreto');
INSERT INTO users (username, password, token) VALUES ('admin2', '123456', 'token');

-- Opcional: agrega algunos productos iniciales
INSERT INTO Products (price, nameProduct) VALUES (10.99, 'Producto 1'), (25.50, 'Producto 2');

SELECT * FROM users;

