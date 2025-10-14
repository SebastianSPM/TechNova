const db = require('../utils/db');  // Importa la conexión a la DB

// Función para obtener todos los productos
const getAllProducts = (callback) => {
  db.query('SELECT * FROM Products', (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

// Función para crear un nuevo producto
const createProduct = (nameProduct, price, callback) => {
  db.query('INSERT INTO Products (nameProduct, price) VALUES (?, ?)', [nameProduct, price], (err, result) => {
    if (err) return callback(err, null);
    callback(null, { id: result.insertId, nameProduct, price });
  });
};

module.exports = { getAllProducts, createProduct };
