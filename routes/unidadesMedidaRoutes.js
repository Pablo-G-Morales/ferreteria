const express = require('express');
const router = express.Router();
const unidadMedidaModel = require('../models/unidadMedidaModel');

// Ruta para obtener todas las unidades con paginación (para el formulario de unidades de medida)
router.get('/unidades', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    unidadMedidaModel.getPaginatedUnidades(limit, offset, (error, results) => {
        if (error) {
            console.error('Error al obtener unidades de medida:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener unidades de medida' });
        }
        unidadMedidaModel.countUnidades((err, total) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al contar unidades de medida' });
            }
            const totalPages = Math.ceil(total / limit);
            res.json({ data: results, totalPages, currentPage: page });
        });
    });
});

// Ruta para obtener la lista de unidades (para el combo box en productos)
router.get('/unidades-list', (req, res) => {
    unidadMedidaModel.getAllUnidades((error, results) => {
        if (error) {
            console.error('Error al obtener unidades de medida:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener unidades de medida' });
        }
        res.json(results); // Enviar las unidades para ser usadas en el combo box
    });
});

// Ruta para crear una nueva unidad de medida
router.post('/unidades', (req, res) => {
    const { nombre, descripcion } = req.body;
    if (!nombre) {
        return res.status(400).json({ success: false, message: 'El nombre de la unidad es requerido' });
    }

    unidadMedidaModel.createUnidad(nombre, descripcion, (error, result) => {
        if (error) {
            console.error('Error al crear la unidad de medida:', error);
            return res.status(500).json({ success: false, message: 'Error al crear la unidad de medida' });
        }
        res.json({ success: true, message: 'Unidad de medida creada correctamente', data: result });
    });
});

// Ruta para actualizar una unidad de medida existente
router.put('/unidades/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, descripcion } = req.body;

    unidadMedidaModel.updateUnidad(id, nombre, descripcion, (error, result) => {
        if (error) {
            console.error('Error al actualizar la unidad de medida:', error);
            return res.status(500).json({ success: false, message: 'Error al actualizar la unidad de medida' });
        }
        res.json({ success: true, message: 'Unidad de medida actualizada correctamente', data: result });
    });
});

// Ruta para eliminar una unidad de medida
router.delete('/unidades/:id', (req, res) => {
    const id = req.params.id;

    unidadMedidaModel.deleteUnidad(id, (error, result) => {
        if (error) {
            console.error('Error al eliminar la unidad de medida:', error);
            return res.status(500).json({ success: false, message: 'Error al eliminar la unidad de medida' });
        }
        res.json({ success: true, message: 'Unidad de medida eliminada correctamente', data: result });
    });
});

module.exports = router;
