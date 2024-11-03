const express = require('express');
const router = express.Router();
const connection = require('../config/db'); // Ajusta la ruta según tu estructura
const crypto = require('crypto'); // Para encriptar con MD5

// Función para encriptar la contraseña usando MD5
function md5(password) {
    return crypto.createHash('md5').update(password).digest('hex');
}

// Ruta para obtener los estados
router.get('/estados', (req, res) => {
    const query = 'SELECT id, nombre FROM estado';
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener los estados' });
        }
        res.json(results);
    });
});

// Ruta para obtener los roles
router.get('/roles', (req, res) => {
    const query = 'SELECT id, nombre FROM rol';
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener los roles' });
        }
        res.json(results);
    });
});

// Ruta para crear un nuevo usuario
router.post('/usuarios', (req, res) => {
    const { nombre, apellido, username, password, telefono, correo, estado_id, rol_id } = req.body;

    if (!nombre || !apellido || !username || !password || !estado_id || !rol_id) {
        return res.status(400).json({ success: false, message: 'Faltan campos obligatorios' });
    }

    const passwordMD5 = md5(password); // Encriptar la contraseña con MD5

    const query = `INSERT INTO usuarios (nombre, apellido, username, password, telefono, correo, estado_id, rol_id)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [nombre, apellido, username, passwordMD5, telefono, correo, estado_id, rol_id];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error('Error al insertar usuario:', err);
            return res.status(500).json({ success: false, message: 'Error al crear el usuario' });
        }
        res.status(201).json({ success: true, message: 'Usuario creado exitosamente' });
    });
});

// **Nueva ruta para actualizar un usuario existente**
router.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, username, password, telefono, correo, estado_id, rol_id } = req.body;

    // Verificar que los campos obligatorios estén presentes
    if (!nombre || !apellido || !username || !estado_id || !rol_id) {
        return res.status(400).json({ success: false, message: 'Faltan campos obligatorios' });
    }

    // Construir la consulta SQL dinámicamente
    let query = 'UPDATE usuarios SET nombre = ?, apellido = ?, username = ?, ';
    let values = [nombre, apellido, username];

    // Si se proporcionó una nueva contraseña, encriptarla y agregarla a la consulta
    if (password) {
        const passwordMD5 = md5(password);
        query += 'password = ?, ';
        values.push(passwordMD5);
    }

    // Agregar los demás campos
    query += 'telefono = ?, correo = ?, estado_id = ?, rol_id = ? WHERE id = ?';
    values.push(telefono || null, correo || null, estado_id, rol_id, id);

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error('Error al actualizar usuario:', err);
            return res.status(500).json({ success: false, message: 'Error al actualizar el usuario' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
        res.json({ success: true, message: 'Usuario actualizado exitosamente' });
    });
});

// Exportar el router para usarlo en el archivo principal (index.js)
module.exports = router;
