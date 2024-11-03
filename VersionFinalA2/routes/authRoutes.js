const express = require('express');
const crypto = require('crypto');
const pool = require('../config/db'); // Importar el pool de conexiones

const router = express.Router();

// Ruta para el inicio de sesión
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

    const query = 'SELECT * FROM usuarios WHERE username = ? AND password = ?';

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error al obtener la conexión:', err);
            return res.status(500).json({ success: false, message: 'Error de conexión a la base de datos' });
        }

        connection.query(query, [username, hashedPassword], (error, results) => {
            connection.release(); // Liberar la conexión después de usarla

            if (error) {
                console.error('Error en la consulta:', error);
                return res.status(500).json({ success: false, message: 'Error en la consulta' });
            }

            if (results.length > 0) {
                const user = results[0];

                if (user.estado_id === 2) {
                    return res.json({ success: false, message: 'Usuario bloqueado. Contacta al administrador.' });
                }

                if (user.rol_id === 1) {
                    return res.json({ success: true, rol: 'admin', message: 'Redirigir a gestion.html' });
                } else {
                    return res.json({ success: true, rol: 'usuario', message: 'Redirigir a dashboard.html' });
                }
            } else {
                return res.json({ success: false, message: 'Usuario o contraseña incorrectos' });
            }
        });
    });
});

module.exports = router;
