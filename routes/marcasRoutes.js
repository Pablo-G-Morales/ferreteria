const express = require('express');
const router = express.Router();
const marcaModel = require('../models/marcaModel');

// Ruta para obtener todas las marcas con paginación
router.get('/marcas', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    marcaModel.getPaginatedMarcas(limit, offset, (error, results) => {
        if (error) {
            console.error('Error al obtener marcas:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener marcas' });
        }
        marcaModel.countMarcas((err, total) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al contar marcas' });
            }
            const totalPages = Math.ceil(total / limit);
            res.json({ data: results, totalPages, currentPage: page });
        });
    });
});

// Ruta para obtener la lista de marcas (para el combo box)
router.get('/marcas-list', (req, res) => {
    marcaModel.getAllMarcas((error, results) => {
        if (error) {
            console.error('Error al obtener marcas:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener marcas' });
        }
        res.json(results); // Enviar las marcas para ser usadas en el combo box
    });
}); // Cierre de la función getAllMarcas

// Ruta para crear una nueva marca
router.post('/marcas', (req, res) => {
    const { nombre, id_proveedor} = req.body;
    if (!nombre) {
        return res.status(400).json({ success: false, message: 'El nombre de la marca es requerido' });
    }

    marcaModel.createMarca(nombre, id_proveedor, (error, result) => {
        if (error) {
            console.error('Error al crear la marca:', error);
            return res.status(500).json({ success: false, message: 'Error al crear la marca' });
        }
        res.json({ success: true, message: 'Marca creada correctamente', data: result });
    });
});

// Ruta para actualizar una marca existente
router.put('/marcas/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, id_proveedor } = req.body;

    if (!nombre) {
        return res.status(400).json({ success: false, message: 'El nombre de la marca es requerido' });
    }

    marcaModel.updateMarca(id, nombre, id_proveedor, (error, result) => {
        if (error) {
            console.error('Error al actualizar la marca:', error);
            return res.status(500).json({ success: false, message: 'Error al actualizar la marca' });
        }
        if (!result) {
            return res.status(404).json({ success: false, message: 'Marca no encontrada' });
        }
        res.json({ success: true, message: 'Marca actualizada correctamente', data: result });
    });
});

// Ruta para eliminar una marca
router.delete('/marcas/:id', (req, res) => {
    const id = req.params.id;

    marcaModel.deleteMarca(id, (error, result) => {
        if (error) {
            console.error('Error al eliminar la marca:', error);
            return res.status(500).json({ success: false, message: 'Error al eliminar la marca' });
        }
        if (!result) {
            return res.status(404).json({ success: false, message: 'Marca no encontrada' });
        }
        res.json({ success: true, message: 'Marca eliminada correctamente', data: result });
    });
});

module.exports = router;
