const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenticateToken = require('../middleware/authMiddleware');

// Rutas para productos
router.get('/products', authenticateToken, productController.getProducts);
router.post('/products', authenticateToken, productController.createProduct);
router.put('/products/:id', authenticateToken, productController.updateProduct);
router.delete('/products/:id', authenticateToken, productController.deleteProduct);

module.exports = router;
