const express = require('express');
const router = express.Router();
const cotizacionModel = require('../models/cotizacionModel');

// Obtener clientes
router.get('/clientes', (req, res) => {
    cotizacionModel.getClientes((error, results) => {
        if (error) {
            console.error('Error al obtener clientes:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener clientes' });
        }
        res.json({ success: true, data: results });
    });
});

// Obtener productos
router.get('/productos', (req, res) => {
    cotizacionModel.getProductos((error, results) => {
        if (error) {
            console.error('Error al obtener productos:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener productos' });
        }
        console.log('Productos obtenidos:', results); // Para depuración
        res.json({ success: true, data: results });
    });
});

// Obtener el precio de un producto por ID
router.get('/productos/:id', (req, res) => {
    const id = req.params.id;

    cotizacionModel.getPrecioProducto(id, (error, results) => {
        if (error) {
            console.error('Error al obtener el precio del producto:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener el precio del producto' });
        }

        if (results.length > 0) {
            res.json({ success: true, precio: results[0].precio }); // Devolver el precio del producto
        } else {
            res.json({ success: false, message: 'Producto no encontrado' });
        }
    });
});

// Obtener cotizaciones paginadas
router.get('/cotizacion', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const offset = (page - 1) * limit;

    cotizacionModel.getPaginatedCotizacion(limit, offset, (error, results) => {
        if (error) {
            console.error('Error al obtener cotizaciones:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener cotizaciones' });
        }
        res.json({ success: true, data: results });
    });
});

// Crear cotización
router.post('/cotizacion', (req, res) => {
    const { nombre_cliente, producto, cantidad, precio_unitario, total } = req.body;

    cotizacionModel.createCotizacion(nombre_cliente, producto, cantidad, precio_unitario, total, (error, result) => {
        if (error) {
            console.error('Error al crear cotización:', error);
            return res.status(500).json({ success: false, message: 'Error al crear cotización' });
        }
        res.json({ success: true, message: 'Cotización creada con éxito' });
    });
});

// Actualizar cotización
router.put('/cotizacion/:id', (req, res) => {
    const id = req.params.id;
    const { nombre_cliente, producto, cantidad, precio_unitario, total } = req.body;

    cotizacionModel.updateCotizacion(id, nombre_cliente, producto, cantidad, precio_unitario, total, (error, result) => {
        if (error) {
            console.error('Error al actualizar cotización:', error);
            return res.status(500).json({ success: false, message: 'Error al actualizar cotización' });
        }
        res.json({ success: true, message: 'Cotización actualizada con éxito' });
    });
});

// Eliminar cotización
router.delete('/cotizacion/:id', (req, res) => {
    const id = req.params.id;

    cotizacionModel.deleteCotizacion(id, (error, result) => {
        if (error) {
            console.error('Error al eliminar cotización:', error);
            return res.status(500).json({ success: false, message: 'Error al eliminar cotización' });
        }
        res.json({ success: true, message: 'Cotización eliminada con éxito' });
    });
});

module.exports = router;