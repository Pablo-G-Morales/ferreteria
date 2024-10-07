const express = require('express');
const router = express.Router();
const productoModel = require('../models/productoModel');
const proveedorModel = require('../models/proveedorModel');
const categoriaModel = require('../models/categoriaModel');
const unidadMedidaModel = require('../models/unidadMedidaModel');
const colorModel = require('../models/colorModel');
const marcaModel = require('../models/marcaModel');

// Ruta para obtener todos los productos con paginación
router.get('/productos', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    productoModel.getPaginatedProductos(limit, offset, (error, results) => {
        if (error) {
            console.error('Error al obtener productos:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener productos' });
        }
        productoModel.countProductos((err, total) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al contar productos' });
            }
            const totalPages = Math.ceil(total / limit);
            res.json({ data: results, totalPages, currentPage: page });
        });
    });
});

// Ruta para crear un nuevo producto
router.post('/productos', (req, res) => {
    const { nombre, descripcion, precio, stock_minimo, id_proveedor, id_categoria, id_unidad_medida, id_color, id_marca } = req.body;

    productoModel.createProducto(nombre, descripcion, precio, stock_minimo, id_proveedor, id_categoria, id_unidad_medida, id_color, id_marca, (error, result) => {
        if (error) {
            console.error('Error al crear el producto:', error);
            return res.status(500).json({ success: false, message: 'Error al crear el producto' });
        }
        res.json({ success: true, message: 'Producto creado correctamente', data: result });
    });
});

// Ruta para actualizar un producto existente
router.put('/productos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock_minimo, id_proveedor, id_categoria, id_unidad_medida, id_color, id_marca } = req.body;

    productoModel.updateProducto(id, nombre, descripcion, precio, stock_minimo, id_proveedor, id_categoria, id_unidad_medida, id_color, id_marca, (error, result) => {
        if (error) {
            console.error('Error al actualizar el producto:', error);
            return res.status(500).json({ success: false, message: 'Error al actualizar el producto' });
        }
        res.json({ success: true, message: 'Producto actualizado correctamente', data: result });
    });
});

// Ruta para eliminar un producto
router.delete('/productos/:id', (req, res) => {
    const { id } = req.params;

    productoModel.deleteProducto(id, (error, result) => {
        if (error) {
            console.error('Error al eliminar el producto:', error);
            return res.status(500).json({ success: false, message: 'Error al eliminar el producto' });
        }
        res.json({ success: true, message: 'Producto eliminado correctamente', data: result });
    });
});

module.exports = router;
