const express = require('express');
const pool = require('../config/db'); // Importar el pool de conexiones

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/usuarios', (req, res) => {
    const query = `
        SELECT u.id, u.nombre, u.apellido, u.telefono, u.correo, u.username, e.nombre AS estado_nombre, r.nombre AS rol_nombre
        FROM usuarios u
        LEFT JOIN estado e ON u.estado_id = e.id
        LEFT JOIN rol r ON u.rol_id = r.id
    `;

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error al obtener la conexión:', err);
            return res.status(500).json({ success: false, message: 'Error de conexión a la base de datos' });
        }

        connection.query(query, (error, results) => {
            connection.release(); // Liberar la conexión después de usarla

            if (error) {
                console.error('Error en la consulta:', error);
                return res.status(500).json({ success: false, message: 'Error en la consulta' });
            }

            res.json(results); // Enviar los resultados en formato JSON
        });
    });
});

// Ruta para crear una nueva categoría
router.post('/categorias', (req, res) => {
    const { nombre, descripcion } = req.body;
    const query = 'INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)';

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error al obtener la conexión:', err);
            return res.status(500).json({ success: false, message: 'Error de conexión a la base de datos' });
        }

        connection.query(query, [nombre, descripcion], (error, results) => {
            connection.release(); // Liberar la conexión después de usarla

            if (error) {
                console.error('Error en la consulta:', error);
                return res.status(500).json({ success: false, message: 'Error al crear la categoría' });
            }

            res.json({ success: true });
        });
    });
});

// Otras rutas (productos, proveedores, marcas, etc.) van aquí de manera similar

module.exports = router;
