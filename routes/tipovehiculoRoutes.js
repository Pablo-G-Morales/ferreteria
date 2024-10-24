const express = require('express');
const router = express.Router();
const tipovehiculoModel = require('../models/tipovehiculoModel');

// Ruta para obtener todos los tipos de vehiculo con paginación (para el formulario de colores)
router.get('/tipovehiculo', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    tipovehiculoModel.getPaginatedTipovehiculo(limit, offset, (error, results) => {
        if (error) {
            console.error('Error al obtener el tipo de vehiculo:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener los tipos de vehiculo' });
        }
        tipovehiculoModel.countTipovehiculo((err, total) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al contar los tipos de vehiculo' });
            }
            const totalPages = Math.ceil(total / limit);
            res.json({ data: results, totalPages, currentPage: page });
        });
    });
});

// Ruta para obtener la lista de tipo de vehiculo
router.get('/tipovehiculo-list', (req, res) => {
    tipovehiculoModel.getAllTipovehiculo((error, results) => {
        if (error) {
            console.error('Error al obtener el tipo de vehiculo:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener los tipos de vehiculo' });
        }
        res.json(results); // Enviar los tipos de vehiculo para ser usados en el combo box
    });
});

// Ruta para crear un nuevo tipo de vehiculo
router.post('/tipovehiculo', (req, res) => {
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).json({ success: false, message: 'El nombre del tipo de vehiculo es requerido' });
    }

    tipovehiculoModel.createTipovehiculo(nombre, (error, result) => {
        if (error) {
            console.error('Error al crear el tipo de vehiculo:', error);
            return res.status(500).json({ success: false, message: 'Error al crear el tipo de vehiculo' });
        }
        res.json({ success: true, message: 'Tipo de vehiculo creado correctamente', data: result });
    });
});

// Ruta para actualizar un tipo de vehiculo existente
router.put('/tipovehiculo/:id', (req, res) => {
    const id = req.params.id;
    const { nombre } = req.body;

    tipovehiculoModel.updateTipovehiculo(id, nombre, (error, result) => {
        if (error) {
            console.error('Error al actualizar el tipo de vehiculo:', error);
            return res.status(500).json({ success: false, message: 'Error al actualizar el tipo de vehiculo' });
        }
        res.json({ success: true, message: 'Tipo de vehiculo actualizado correctamente', data: result });
    });
});

// Ruta para eliminar un tipo de vehiculo
router.delete('/tipovehiculo/:id', (req, res) => {
    const id = req.params.id;

    tipovehiculoModel.deleteTipovehiculo(id, (error, result) => {
        if (error) {
            console.error('Error al eliminar el tipo de vehiculo:', error);
            return res.status(500).json({ success: false, message: 'Error al eliminar el tipo de vehiculo' });
        }
        res.json({ success: true, message: 'Tipo de vehiculo eliminado correctamente', data: result });
    });
});

module.exports = router;