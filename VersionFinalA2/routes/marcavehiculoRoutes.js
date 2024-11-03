const express = require('express');
const router = express.Router();
const marcavehiculoModel = require('../models/marcavehiculoModel');

// Ruta para obtener todos las marcas de vehiculo con paginación (para el formulario de colores)
router.get('/marcavehiculo', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    marcavehiculoModel.getPaginatedMarcavehiculo(limit, offset, (error, results) => {
        if (error) {
            console.error('Error al obtener la marca de vehiculo:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener las marcas de vehiculo' });
        }
        marcavehiculoModel.countMarcavehiculo((err, total) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al contar las marcas de vehiculo' });
            }
            const totalPages = Math.ceil(total / limit);
            res.json({ data: results, totalPages, currentPage: page });
        });
    });
});

// Ruta para obtener la lista de las marcas de vehiculo
router.get('/marcavehiculo-list', (req, res) => {
    marcavehiculoModel.getAllMarcavehiculo((error, results) => {
        if (error) {
            console.error('Error al obtener la marca de vehiculo:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener las marcas de vehiculo' });
        }
        res.json(results); // Enviar las marcas de vehiculo para ser usados en el combo box
    });
});

// Ruta para crear un nueva marca de vehiculo
router.post('/marcavehiculo', (req, res) => {
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).json({ success: false, message: 'El nombre de la marca de vehiculo es requerido' });
    }

    marcavehiculoModel.createMarcavehiculo(nombre, (error, result) => {
        if (error) {
            console.error('Error al crear la marca de vehiculo:', error);
            return res.status(500).json({ success: false, message: 'Error al crear la marca de vehiculo' });
        }
        res.json({ success: true, message: 'Marca de vehiculo creado correctamente', data: result });
    });
});

// Ruta para actualizar una marca de vehiculo existente
router.put('/marcavehiculo/:id', (req, res) => {
    const id = req.params.id;
    const { nombre } = req.body;

    marcavehiculoModel.updateMarcavehiculo(id, nombre, (error, result) => {
        if (error) {
            console.error('Error al actualizar la marca de vehiculo:', error);
            return res.status(500).json({ success: false, message: 'Error al actualizar la marca de vehiculo' });
        }
        res.json({ success: true, message: 'Marca de vehiculo actualizado correctamente', data: result });
    });
});

// Ruta para eliminar una marca de vehiculo
router.delete('/marcavehiculo/:id', (req, res) => {
    const id = req.params.id;

    marcavehiculoModel.deleteMarcavehiculo(id, (error, result) => {
        if (error) {
            console.error('Error al eliminar la marca de vehiculo:', error);
            return res.status(500).json({ success: false, message: 'Error al eliminar la marca de vehiculo' });
        }
        res.json({ success: true, message: 'Marca de vehiculo eliminado correctamente', data: result });
    });
});

module.exports = router;