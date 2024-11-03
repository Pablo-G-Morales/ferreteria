const connection = require('../config/db'); // Conexión a la base de datos

exports.getUsers = (req, res) => {
  const query = 'SELECT * FROM usuarios'; // Ajusta el nombre de la tabla según tu base de datos

  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
    res.json(results); // Devuelve los usuarios al frontend en formato JSON
  });
};
