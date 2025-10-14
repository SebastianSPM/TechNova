const db = require('../utils/db');  // Importar la conexión a la base de datos

// Controlador para obtener todos los productos
exports.getProducts = (req, res) => {
  db.query('SELECT * FROM Products', (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching products' });
    res.json(results);
  });
};

// Controlador para crear un nuevo producto
exports.createProduct = (req, res) => {
  const { nameProduct, price } = req.body;
  if (!price || !nameProduct) return res.status(400).json({ message: 'Missing fields' });

  db.query('INSERT INTO Products (price, nameProduct) VALUES (?, ?)', [price, nameProduct], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error adding product' });
    res.status(201).json({ id: result.insertId, price, nameProduct });
  });
};

// Controlador para actualizar un producto
exports.updateProduct = (req, res) => {
  const id = req.params.id;
  const { price, nameProduct } = req.body;

  db.query('UPDATE Products SET price = ?, nameProduct = ? WHERE id = ?', [price, nameProduct, id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error updating product' });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product updated' });
  });
};

// Controlador para eliminar un producto
exports.deleteProduct = (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM Products WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error deleting product' });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  });
};
