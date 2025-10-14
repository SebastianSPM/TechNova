const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../utils/db');  // Importa la conexión a la DB

// Controlador para login
exports.login = (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error en el servidor' });
    if (results.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });

    const user = results[0];

    // Verificar contraseña
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: 'Error en la comparación de la contraseña' });
      if (!isMatch) return res.status(401).json({ message: 'Credenciales inválidas' });

      // Generar el token JWT
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({ token });
    });
  });
};
