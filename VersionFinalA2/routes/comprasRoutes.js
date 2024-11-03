const express = require('express');
const router = express.Router();
const compraModel = require('../models/compraModel');
const proveedorModel = require('../models/proveedorModel');

// Ruta para obtener todas las compras con paginación
router.get('/compras', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    compraModel.getPaginatedCompras(limit, offset, (error, results) => {
        if (error) {
            console.error('Error al obtener compras:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener compras' });
        }
        compraModel.countCompras((err, total) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al contar compras' });
            }
            const totalPages = Math.ceil(total / limit);
            res.json({ data: results, totalPages, currentPage: page });
        });
    });
});

// Ruta para crear una nueva compra
router.post('/compras', (req, res) => {
    const { id_proveedor, fecha_compra, total } = req.body;

    // Validar campos
    if (!id_proveedor || !fecha_compra || !total) {
        return res.status(400).json({ success: false, message: 'Todos los campos son requeridos' });
    }

    // Depuración: Verificar que los datos estén llegando al servidor
    console.log('Datos recibidos en /compras:', { id_proveedor, fecha_compra, total });

    // Convertir fecha al formato yyyy-mm-dd si es necesario
    let formattedDate = fecha_compra;
    if (fecha_compra.includes('/')) {
        const [day, month, year] = fecha_compra.split('/');
        formattedDate = `${year}-${month}-${day}`;
    }

    // Crear la compra en la base de datos
    compraModel.createCompra(id_proveedor, formattedDate, total, (error, result) => {
        if (error) {
            console.error('Error al crear la compra:', error);
            return res.status(500).json({ success: false, message: 'Error al crear la compra' });
        }
        res.json({ success: true, message: 'Compra creada correctamente', data: result });
    });
});

// Ruta para actualizar una compra existente
router.put('/compras/:id', (req, res) => {
    const { id } = req.params;
    const { id_proveedor, fecha_compra, total } = req.body;

    // Validar campos
    if (!id_proveedor || !fecha_compra || !total) {
        return res.status(400).json({ success: false, message: 'Todos los campos son requeridos' });
    }

    // Convertir fecha al formato yyyy-mm-dd si es necesario
    let formattedDate = fecha_compra;
    if (fecha_compra.includes('/')) {
        const [day, month, year] = fecha_compra.split('/');
        formattedDate = `${year}-${month}-${day}`;
    }

    // Actualizar la compra en la base de datos
    compraModel.updateCompra(id, id_proveedor, formattedDate, total, (error, result) => {
        if (error) {
            console.error('Error al actualizar la compra:', error);
            return res.status(500).json({ success: false, message: 'Error al actualizar la compra' });
        }
        res.json({ success: true, message: 'Compra actualizada correctamente', data: result });
    });
});

// Ruta para eliminar una compra
router.delete('/compras/:id', (req, res) => {
    const { id } = req.params;

    compraModel.deleteCompra(id, (error, result) => {
        if (error) {
            console.error('Error al eliminar la compra:', error);
            return res.status(500).json({ success: false, message: 'Error al eliminar la compra' });
        }
        res.json({ success: true, message: 'Compra eliminada correctamente', data: result });
    });
});

// Ruta para obtener la lista de proveedores (para el combo box en el formulario)
router.get('/proveedores-list', (req, res) => {
    proveedorModel.getAllProveedores((error, results) => {
        if (error) {
            console.error('Error al obtener proveedores:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener proveedores' });
        }
        res.json(results); // Enviar la lista de proveedores
    });
});

module.exports = router;
