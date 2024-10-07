const express = require('express');
const router = express.Router();
const categoriaModel = require('../models/categoriaModel'); // Asegúrate de que el modelo esté importado correctamente
    
// Ruta para obtener todas las categorías con paginación
router.get('/categorias', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    categoriaModel.getPaginatedCategorias(limit, offset, (error, results) => {
        if (error) {
            console.error('Error al obtener categorías:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener categorías' });
        }
        categoriaModel.countCategorias((err, total) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al contar categorías' });
            }
            const totalPages = Math.ceil(total / limit);
            res.json({ data: results, totalPages, currentPage: page });
        });
    });
});

// Ruta para obtener la lista de categorías (para el combo box en otros formularios)
router.get('/categorias-list', (req, res) => {
    categoriaModel.getAllCategorias((error, results) => {
        if (error) {
            console.error('Error al obtener categorías:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener categorías' });
        }
        res.json(results); // Enviar las categorías para ser usadas en el combo box
    });
});

// Ruta para crear una nueva categoría
router.post('/categorias', (req, res) => {
    const { nombre, descripcion } = req.body;
    if (!nombre) {
        return res.status(400).json({ success: false, message: 'El nombre de la categoría es requerido' });
    }

    categoriaModel.createCategoria(nombre, descripcion, (error, result) => {
        if (error) {
            console.error('Error al crear la categoría:', error);
            return res.status(500).json({ success: false, message: 'Error al crear la categoría' });
        }
        res.json({ success: true, message: 'Categoría creada correctamente', data: result });
    });
});

// Ruta para actualizar una categoría existente
router.put('/categorias/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, descripcion } = req.body;

    categoriaModel.updateCategoria(id, nombre, descripcion, (error, result) => {
        if (error) {
            console.error('Error al actualizar la categoría:', error);
            return res.status(500).json({ success: false, message: 'Error al actualizar la categoría' });
        }
        res.json({ success: true, message: 'Categoría actualizada correctamente', data: result });
    });
});

// Ruta para eliminar una categoría
router.delete('/categorias/:id', (req, res) => {
    const id = req.params.id;

    categoriaModel.deleteCategoria(id, (error, result) => {
        if (error) {
            console.error('Error al eliminar la categoría:', error);
            return res.status(500).json({ success: false, message: 'Error al eliminar la categoría' });
        }
        res.json({ success: true, message: 'Categoría eliminada correctamente', data: result });
    });
});

module.exports = router;
