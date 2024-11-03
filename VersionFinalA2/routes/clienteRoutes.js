const express = require('express');
const router = express.Router();
const clienteModel = require('../models/clienteModel'); // Asegúrate de que la ruta sea correcta

// Crear un nuevo cliente
router.post('/cliente', (req, res) => {
    const clienteData = req.body; // Asegúrate de que el body-parser esté configurado
    clienteModel.createCliente(clienteData, (error, result) => {
        if (error) {
            console.error('Error al crear cliente:', error);
            return res.status(500).json({ success: false, message: 'Error al crear cliente' });
        }
        res.status(201).json({ success: true, data: result });
    });
});

// Obtener todos los clientes
router.get('/cliente', (req, res) => {
    clienteModel.getClientes((error, results) => {
        if (error) {
            console.error('Error al obtener clientes:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener clientes' });
        }
        res.status(200).json({ success: true, data: results });
    });
});

// Obtener un cliente por ID
router.get('/cliente/:codigo_cliente', (req, res) => {
    const { codigo_cliente } = req.params;
    clienteModel.getClienteById(codigo_cliente, (error, result) => {
        if (error) {
            console.error('Error al obtener cliente:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener cliente' });
        }
        if (!result) {
            return res.status(404).json({ success: false, message: 'Cliente no encontrado' });
        }
        res.status(200).json({ success: true, data: result });
    });
});

// Actualizar un cliente
router.put('/cliente/:codigo_cliente', (req, res) => {
    const { codigo_cliente } = req.params;
    const clienteData = req.body;
    clienteModel.updateCliente(codigo_cliente, clienteData, (error, result) => {
        if (error) {
            console.error('Error al actualizar cliente:', error);
            return res.status(500).json({ success: false, message: 'Error al actualizar cliente' });
        }
        res.status(200).json({ success: true, data: result });
    });
});

// Eliminar un cliente
router.delete('/cliente/:codigo_cliente', (req, res) => {
    const { codigo_cliente } = req.params;
    clienteModel.deleteCliente(codigo_cliente, (error, result) => {
        if (error) {
            console.error('Error al eliminar cliente:', error);
            return res.status(500).json({ success: false, message: 'Error al eliminar cliente' });
        }
        res.status(204).send(); // No hay contenido para enviar
    });
});

module.exports = router;
