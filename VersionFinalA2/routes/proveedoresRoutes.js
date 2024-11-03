const express = require('express');
const router = express.Router();
const proveedorModel = require('../models/proveedorModel');

// Ruta para obtener todos los proveedores con paginación
router.get('/proveedores', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    proveedorModel.getPaginatedProveedores(limit, offset, (error, results) => {
        if (error) {
            console.error('Error al obtener proveedores:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener proveedores' });
        }
        proveedorModel.countProveedores((err, total) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al contar proveedores' });
            }
            const totalPages = Math.ceil(total / limit);
            res.json({ data: results, totalPages, currentPage: page });
        });
    });
});

// Ruta para obtener la lista de proveedores (para el combo box en marcas)
router.get('/proveedores-list', (req, res) => {
    proveedorModel.getAllProveedores((error, results) => {
        if (error) {
            console.error('Error al obtener proveedores:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener proveedores' });
        }
        res.json(results); // Enviar los proveedores para ser usados en el combo box
    });
});

// Ruta para crear un nuevo proveedor
router.post('/proveedores', (req, res) => {
    const { nombre, direccion, telefono, correo, celular, contacto, pagina_web } = req.body;
    if (!nombre) {
        return res.status(400).json({ success: false, message: 'El nombre del proveedor es requerido' });
    }

    proveedorModel.createProveedor(nombre, direccion, telefono, correo, celular, contacto, pagina_web, (error, result) => {
        if (error) {
            console.error('Error al crear el proveedor:', error);
            return res.status(500).json({ success: false, message: 'Error al crear el proveedor' });
        }
        res.json({ success: true, message: 'Proveedor creado correctamente', data: result });
    });
});

// Ruta para actualizar un proveedor existente
router.put('/proveedores/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, direccion, telefono, correo, celular, contacto, pagina_web } = req.body;

    if (!nombre) {
        return res.status(400).json({ success: false, message: 'El nombre del proveedor es requerido' });
    }

    proveedorModel.updateProveedor(id, nombre, direccion, telefono, correo, celular, contacto, pagina_web, (error, result) => {
        if (error) {
            console.error('Error al actualizar el proveedor:', error);
            return res.status(500).json({ success: false, message: 'Error al actualizar el proveedor' });
        }
        if (!result) {
            return res.status(404).json({ success: false, message: 'Proveedor no encontrado' });
        }
        res.json({ success: true, message: 'Proveedor actualizado correctamente', data: result });
    });
});

// Ruta para eliminar un proveedor
router.delete('/proveedores/:id', (req, res) => {
    const id = req.params.id;

    proveedorModel.deleteProveedor(id, (error, result) => {
        if (error) {
            console.error('Error al eliminar el proveedor:', error);
            return res.status(500).json({ success: false, message: 'Error al eliminar el proveedor' });
        }
        if (!result) {
            return res.status(404).json({ success: false, message: 'Proveedor no encontrado' });
        }
        res.json({ success: true, message: 'Proveedor eliminado correctamente', data: result });
    });
});

module.exports = router;

