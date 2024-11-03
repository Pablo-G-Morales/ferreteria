// routes/facturaRoutes.js
const express = require('express');
const router = express.Router();
const facturaModel = require('../models/facturaModel');

// Ruta para guardar una factura
router.post('/guardar-factura', (req, res) => {
    const facturaData = req.body;

    facturaModel.guardarFactura(facturaData, (error, result) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Error al guardar datos de factura' });
        }
        res.status(201).json({ success: true, message: 'Datos de factura guardados con éxito' });
    });
});

module.exports = router;