const express = require('express');
const router = express.Router();
const generoModel = require('../models/generoModel');

// Ruta para obtener todos los generos de los empleados con paginación (para el formulario de genero)
router.get('/genero', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    generoModel.getPaginatedGenero(limit, offset, (error, results) => {
        if (error) {
            console.error('Error al obtener el genero del empleado:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener los generos de los empleados' });
        }
        generoModel.countGenero((err, total) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al contar los generos de los empleados' });
            }
            const totalPages = Math.ceil(total / limit);
            res.json({ data: results, totalPages, currentPage: page });
        });
    });
});

// Ruta para obtener el genero del empleado
router.get('/genero-list', (req, res) => {
    generoModel.getAllGenero((error, results) => {
        if (error) {
            console.error('Error al obtener el genero del empleado:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener el genero del empleado' });
        }
        res.json(results); // Enviar el genero del empleado para ser usados en el combo box
    });
});

// Ruta para crear un nuevo genero del empleado
router.post('/genero', (req, res) => {
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).json({ success: false, message: 'El genero del empleado es requerido' });
    }

    generoModel.createGenero(nombre, (error, result) => {
        if (error) {
            console.error('Error al crear el genero del empleado:', error);
            return res.status(500).json({ success: false, message: 'Error al crear el genero del empleado' });
        }
        res.json({ success: true, message: 'Genero del empleado creado correctamente', data: result });
    });
});

// Ruta para actualizar un genero del empleado existente
router.put('genero/:id', (req, res) => {
    const id = req.params.id;
    const { nombre } = req.body;

    generoModel.updateGenero(id, nombre, (error, result) => {
        if (error) {
            console.error('Error al actualizar el genero del empleado:', error);
            return res.status(500).json({ success: false, message: 'Error al actualizar el genero del empleado' });
        }
        res.json({ success: true, message: 'Genero del empleado actualizado correctamente', data: result });
    });
});

// Ruta para eliminar un genero del empleado
router.delete('/genero/:id', (req, res) => {
    const id = req.params.id;

    generoModel.deleteGenero(id, (error, result) => {
        if (error) {
            console.error('Error al eliminar el genero del empleado:', error);
            return res.status(500).json({ success: false, message: 'Error al eliminar el genero del empleado' });
        }
        res.json({ success: true, message: 'Genero del empleado eliminado correctamente', data: result });
    });
});

module.exports = router;