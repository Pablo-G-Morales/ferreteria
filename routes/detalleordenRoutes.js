const express = require('express');
const router = express.Router();
const detalleordenModel = require('../models/detalleordenModel');
const orden_compraModel = require('../models/orden_compraModel');
const productoModel = require('../models/productoModel');

// Ruta para obtener todos las ordenes con paginación
router.get('/detalleorden', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    detalleordenModel.getPaginatedDetalleorden(limit, offset, (error, results) => {
        if (error) {
            console.error('Error al obtener los detalles:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener los detalles' });
        }
        detalleordenModel.countDetalleorden((err, total) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al contar los detalles' });
            }
            const totalPages = Math.ceil(total / limit);
            res.json({ data: results, totalPages, currentPage: page });
        });
    });
});

// Ruta para crear una nueva orden
router.post('/detalleorden', (req, res) => {
    const { idorden, id_producto, precio, cantidad, subtotal } = req.body;

    // Validar campos
    if ( !idorden || !id_producto || !precio || !cantidad || !subtotal) {
        return res.status(400).json({ success: false, message: 'Todos los campos son requeridos' });
    }

    // Depuración: Verificar que los datos estén llegando al servidor
    console.log('Datos recibidos en /detalleorden:', { idorden, id_producto, precio, cantidad, subtotal });

    // Convertir fecha al formato yyyy-mm-dd si es necesario
    /*let formattedDate = fecha;
    if (fecha.includes('/')) {
        const [day, month, year] = fecha.split('/');
        formattedDate = `${year}-${month}-${day}`;
    }*/

    // Crear la orden en la base de datos
    detalleordenModel.createDetalleorden(idorden, id_producto, precio, cantidad, subtotal, (error, result) => {
        if (error) {
            console.error('Error al crear el detalle:', error);
            return res.status(500).json({ success: false, message: 'Error al crear el detalle' });
        }
        res.json({ success: true, message: 'Detalle orden creada correctamente', data: result });
    });
});

// Ruta para actualizar un detalle orden existente
router.put('/detalleorden/:id', (req, res) => {
    const { id } = req.params;
    const { idorden, id_producto, precio, cantidad, subtotal } = req.body;

    // Validar campos
    if (!idorden || !id_producto || !precio || !cantidad || !subtotal) {
        return res.status(400).json({ success: false, message: 'Todos los campos son requeridos' });
    }

    // Convertir fecha al formato yyyy-mm-dd si es necesario
    /*let formattedDate = fecha;
    if (fecha.includes('/')) {
        const [day, month, year] = fecha.split('/');
        formattedDate = `${year}-${month}-${day}`;
    }*/

    // Actualizar el detalle orden en la base de datos
    detalleordenModel.updateDetalleorden(id, idorden, id_producto, precio, cantidad, subtotal, (error, result) => {
        if (error) {
            console.error('Error al actualizar el detalle:', error);
            return res.status(500).json({ success: false, message: 'Error al actualizar el detalle' });
        }
        res.json({ success: true, message: 'Detalle orden actualizada correctamente', data: result });
    });
});

// Ruta para eliminar una orden
router.delete('/detalleorden/:id', (req, res) => {
    const { id } = req.params;

    detalleordenModel.deleteDetalleorden(id, (error, result) => {
        if (error) {
            console.error('Error al eliminar el detalle:', error);
            return res.status(500).json({ success: false, message: 'Error al eliminar el detalle' });
        }
        res.json({ success: true, message: 'Detalle orden eliminada correctamente', data: result });
    });
});

// Ruta para obtener la lista de ordenes (para el combo box en el formulario)
router.get('/ordencompra-list', (req, res) => {
    orden_compraModel.getAllOrden((error, results) => {
        if (error) {
            console.error('Error al obtener ordenes:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener orden' });
        }
        res.json(results); // Enviar la lista de ordenes
    });
});

// Ruta para obtener la lista de productos
router.get('/productos-list', (req, res) => {
    productoModel.getAllProducto((error, results) => {
        if (error) {
            console.error('Error al obtener productos:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener productos' });
        }
        res.json(results); // Enviar la lista de productos
    });
});

module.exports = router;

