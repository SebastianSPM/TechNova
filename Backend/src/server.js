require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./utils/db');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Aquí pones la URL de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Middleware para proteger rutas con JWT (espera "Bearer <token>")
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token invalid' });
    req.user = user;
    next();
  });
};

// LOGIN - valida usuario y password con bcrypt, devuelve JWT
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });

    const user = results[0];

    // Compara password con hash almacenado
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

      // Generar token JWT con id y username
      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.json({ token });
    });
  });
});

// GET productos (protegido)
app.get('/products', authenticateToken, (req, res) => {
  db.query('SELECT * FROM Products', (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching products' });
    res.json(results);
  });
});

// POST nuevo producto (protegido)
app.post('/products', authenticateToken, (req, res) => {
  const { price, nameProduct } = req.body;
  if (!price || !nameProduct) return res.status(400).json({ message: 'Missing fields' });

  db.query('INSERT INTO Products (price, nameProduct) VALUES (?, ?)', [price, nameProduct], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error adding product' });
    res.status(201).json({ id: result.insertId, price, nameProduct });
  });
});

// PUT editar producto (protegido)
app.put('/products/:id', authenticateToken, (req, res) => {
  const id = req.params.id;
  const { price, nameProduct } = req.body;
  db.query('UPDATE Products SET price = ?, nameProduct = ? WHERE id = ?', [price, nameProduct, id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error updating product' });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product updated' });
  });
});

// DELETE producto (protegido)
app.delete('/products/:id', authenticateToken, (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM Products WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error deleting product' });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  });
});

// Middleware 404 para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
