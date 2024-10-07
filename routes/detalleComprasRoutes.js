const express = require('express');
const router = express.Router();
const detalleCompraModel = require('../models/detalleCompraModel');
const compraModel = require('../models/compraModel');
const productoModel = require('../models/productoModel');

// Ruta para obtener todos los detalles de compras con paginación
router.get('/detalle_compras', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    detalleCompraModel.getPaginatedDetalleCompras(limit, offset, (error, results) => {
        if (error) {
            console.error('Error al obtener detalles de compras:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener detalles de compras' });
        }
        detalleCompraModel.countDetalleCompras((err, total) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al contar detalles de compras' });
            }
            const totalPages = Math.ceil(total / limit);
            res.json({ data: results, totalPages, currentPage: page });
        });
    });
});

// Ruta para crear un nuevo detalle de compra
router.post('/detalle_compras', (req, res) => {
    const { id_compra, id_producto, cantidad, precio_unitario, subtotal } = req.body;

    if (!id_compra || !id_producto || !cantidad || !precio_unitario || !subtotal) {
        return res.status(400).json({ success: false, message: 'Todos los campos son requeridos' });
    }

    detalleCompraModel.createDetalleCompra(id_compra, id_producto, cantidad, precio_unitario, subtotal, (error, result) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Error al crear el detalle de compra' });
        }
        res.json({ success: true, message: 'Detalle de compra creado correctamente', data: result });
    });
});

// Ruta para actualizar un detalle de compra existente
router.put('/detalle_compras/:id', (req, res) => {
    const { id } = req.params;
    const { id_compra, id_producto, cantidad, precio_unitario, subtotal } = req.body;

    if (!id_compra || !id_producto || !cantidad || !precio_unitario || !subtotal) {
        return res.status(400).json({ success: false, message: 'Todos los campos son requeridos' });
    }

    detalleCompraModel.updateDetalleCompra(id, id_compra, id_producto, cantidad, precio_unitario, subtotal, (error, result) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Error al actualizar el detalle de compra' });
        }
        res.json({ success: true, message: 'Detalle de compra actualizado correctamente', data: result });
    });
});

// Ruta para eliminar un detalle de compra
router.delete('/detalle_compras/:id', (req, res) => {
    const { id } = req.params;

    detalleCompraModel.deleteDetalleCompra(id, (error, result) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Error al eliminar el detalle de compra' });
        }
        res.json({ success: true, message: 'Detalle de compra eliminado correctamente', data: result });
    });
});

// Ruta para obtener la lista de compras (para el combo box)
router.get('/compras-list', (req, res) => {
    compraModel.getAllCompras((error, results) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Error al obtener compras' });
        }
        res.json(results);
    });
});

// Ruta para obtener la lista de productos (para el combo box)
router.get('/productos-list', (req, res) => {
    productoModel.getAllProductos((error, results) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Error al obtener productos' });
        }
        res.json(results);
    });
});

module.exports = router;
