const express = require('express');
const router = express.Router();
const tipopagoModel = require('../models/tipopagoModel');

// Ruta para obtener todos los colores con paginación (para el formulario de colores)
router.get('/tipopago', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    tipopagoModel.getPaginatedTipopago(limit, offset, (error, results) => {
        if (error) {
            console.error('Error al obtener el tipo de pago:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener los tipos de pago' });
        }
        tipopagoModel.countTipopago((err, total) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al contar los tipos de pago' });
            }
            const totalPages = Math.ceil(total / limit);
            res.json({ data: results, totalPages, currentPage: page });
        });
    });
});

// Ruta para obtener la lista de tipo de pago 
router.get('/tipopago-list', (req, res) => {
    tipopagoModel.getAllTipopago((error, results) => {
        if (error) {
            console.error('Error al obtener el tipo de pago:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener los tipos de pago' });
        }
        res.json(results); // Enviar los tipos de pago para ser usados en el combo box
    });
});

// Ruta para crear un nuevo tipo de pago
router.post('/tipopago', (req, res) => {
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).json({ success: false, message: 'El nombre del tipo de pago es requerido' });
    }

    tipopagoModel.createTipopago(nombre, (error, result) => {
        if (error) {
            console.error('Error al crear el tipo de pago:', error);
            return res.status(500).json({ success: false, message: 'Error al crear el tipo de pago' });
        }
        res.json({ success: true, message: 'Tipo de pago creado correctamente', data: result });
    });
});

// Ruta para actualizar un tipo de pago existente
router.put('/tipopago/:id', (req, res) => {
    const id = req.params.id;
    const { nombre } = req.body;

    tipopagoModel.updateTipopago(id, nombre, (error, result) => {
        if (error) {
            console.error('Error al actualizar el tipo de pago:', error);
            return res.status(500).json({ success: false, message: 'Error al actualizar el tipo de pago' });
        }
        res.json({ success: true, message: 'Tipo de pago actualizado correctamente', data: result });
    });
});

// Ruta para eliminar un tipo de pago
router.delete('/tipopago/:id', (req, res) => {
    const id = req.params.id;

    tipopagoModel.deleteTipopago(id, (error, result) => {
        if (error) {
            console.error('Error al eliminar el tipo de pago:', error);
            return res.status(500).json({ success: false, message: 'Error al eliminar el tipo de pago' });
        }
        res.json({ success: true, message: 'Tipo de pago eliminado correctamente', data: result });
    });
});

module.exports = router;