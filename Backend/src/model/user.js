const bcrypt = require('bcryptjs');

function createUser(username, password) {
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) throw err;
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, hashedPassword], (err, results) => {
      if (err) throw err;
      console.log('User created', results);
    });
  });
}
