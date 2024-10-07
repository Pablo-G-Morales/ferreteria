const express = require('express');
const router = express.Router();
const colorModel = require('../models/colorModel');

// Ruta para obtener todos los colores con paginación (para el formulario de colores)
router.get('/colores', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    colorModel.getPaginatedColores(limit, offset, (error, results) => {
        if (error) {
            console.error('Error al obtener colores:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener colores' });
        }
        colorModel.countColores((err, total) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al contar colores' });
            }
            const totalPages = Math.ceil(total / limit);
            res.json({ data: results, totalPages, currentPage: page });
        });
    });
});

// Ruta para obtener la lista de colores (para el combo box en productos)
router.get('/colores-list', (req, res) => {
    colorModel.getAllColores((error, results) => {
        if (error) {
            console.error('Error al obtener colores:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener colores' });
        }
        res.json(results); // Enviar los colores para ser usados en el combo box
    });
});

// Ruta para crear un nuevo color
router.post('/colores', (req, res) => {
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).json({ success: false, message: 'El nombre del color es requerido' });
    }

    colorModel.createColor(nombre, (error, result) => {
        if (error) {
            console.error('Error al crear el color:', error);
            return res.status(500).json({ success: false, message: 'Error al crear el color' });
        }
        res.json({ success: true, message: 'Color creado correctamente', data: result });
    });
});

// Ruta para actualizar un color existente
router.put('/colores/:id', (req, res) => {
    const id = req.params.id;
    const { nombre } = req.body;

    colorModel.updateColor(id, nombre, (error, result) => {
        if (error) {
            console.error('Error al actualizar el color:', error);
            return res.status(500).json({ success: false, message: 'Error al actualizar el color' });
        }
        res.json({ success: true, message: 'Color actualizado correctamente', data: result });
    });
});

// Ruta para eliminar un color
router.delete('/colores/:id', (req, res) => {
    const id = req.params.id;

    colorModel.deleteColor(id, (error, result) => {
        if (error) {
            console.error('Error al eliminar el color:', error);
            return res.status(500).json({ success: false, message: 'Error al eliminar el color' });
        }
        res.json({ success: true, message: 'Color eliminado correctamente', data: result });
    });
});

module.exports = router;
