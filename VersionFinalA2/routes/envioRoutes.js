// routes/envioRoutes.js
const express = require('express');
const router = express.Router();
const envioModel = require('../models/envioModel');
const pool = require('../config/db');

// Guardar datos de envío
router.post('/guardar-datos', (req, res) => {
    const envioData = req.body;

    console.log('Datos recibidos para guardar:', envioData);

    envioModel.guardarEnvio(envioData, (error, result) => {
        if (error) {
            console.error('Error al guardar datos de envío:', error);
            return res.status(500).json({ success: false, message: 'Error al guardar datos de envío' });
        }
        res.status(201).json({ success: true, message: 'Datos de envío guardados con éxito' });
    });
});

module.exports = router;
