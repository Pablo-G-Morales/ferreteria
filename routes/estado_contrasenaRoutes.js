const express = require('express');
const router = express.Router();
const estadocontrasenaModel = require('../models/estadocontrasenaModel');

// Ruta para obtener todos los estados de contraseña con paginación (para el formulario de colores)
router.get('/estadocontrasena', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    estadocontrasenaModel.getPaginatedEstadocontrasena(limit, offset, (error, results) => {
        if (error) {
            console.error('Error al obtener el estado de contraseña:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener los estados de contraseña' });
        }
        estadocontrasenaModel.countEstadocontrasena((err, total) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al contar los estados de contraseña' });
            }
            const totalPages = Math.ceil(total / limit);
            res.json({ data: results, totalPages, currentPage: page });
        });
    });
});

// Ruta para obtener la lista de estado de contraseña 
router.get('/estadocontrasena-list', (req, res) => {
    estadocontrasenaModel.getAllEstadocontrasena((error, results) => {
        if (error) {
            console.error('Error al obtener el estado de contraseña:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener los estados de contraseña' });
        }
        res.json(results); // Enviar los estados de contraseña para ser usados en el combo box
    });
});

// Ruta para crear un nuevo estado de contraseña
router.post('/estadocontrasena', (req, res) => {
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).json({ success: false, message: 'El nombre del estado de contraseña es requerido' });
    }

    estadocontrasenaModel.createEstadocontrasena(nombre, (error, result) => {
        if (error) {
            console.error('Error al crear el estado de contraseña:', error);
            return res.status(500).json({ success: false, message: 'Error al crear el estado de contraseña' });
        }
        res.json({ success: true, message: 'Estado de contraseña creado correctamente', data: result });
    });
});

// Ruta para actualizar un estado de contraseña existente
router.put('/estadocontrasena/:id', (req, res) => {
    const id = req.params.id;
    const { nombre } = req.body;

    estadocontrasenaModel.updateEstadocontrasena(id, nombre, (error, result) => {
        if (error) {
            console.error('Error al actualizar el estado de contraseña:', error);
            return res.status(500).json({ success: false, message: 'Error al actualizar el estado de contraseña' });
        }
        res.json({ success: true, message: 'Estado de contraseña actualizado correctamente', data: result });
    });
});

// Ruta para eliminar un estado de contraseña
router.delete('/estadocontrasena/:id', (req, res) => {
    const id = req.params.id;

    estadocontrasenaModel.deleteEstadocontrasena(id, (error, result) => {
        if (error) {
            console.error('Error al eliminar el estado de contraseña:', error);
            return res.status(500).json({ success: false, message: 'Error al eliminar el estado de contraseña' });
        }
        res.json({ success: true, message: 'Estado de contraseña eliminado correctamente', data: result });
    });
});

module.exports = router;