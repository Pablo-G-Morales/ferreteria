const express = require('express');
const router = express.Router();
const cargoempleadoModel = require('../models/cargoempleadoModel');

// Ruta para obtener todos los cargos de empleados con paginación (para el formulario de colores)
router.get('/cargoempleado', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    cargoempleadoModel.getPaginatedCargo(limit, offset, (error, results) => {
        if (error) {
            console.error('Error al obtener el cargo de empleado:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener los cargos de empleado' });
        }
        cargoempleadoModel.countCargo((err, total) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al contar los cargos de empleado' });
            }
            const totalPages = Math.ceil(total / limit);
            res.json({ data: results, totalPages, currentPage: page });
        });
    });
});

// Ruta para obtener la lista de los cargos de empleado
router.get('/cargoempleado-list', (req, res) => {
    cargoempleadoModel.getAllCargo((error, results) => {
        if (error) {
            console.error('Error al obtener el cargo de empleado:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener los cargos de empleado' });
        }
        res.json(results); // Enviar los cargos de empleado para ser usados en el combo box
    });
});

// Ruta para crear un nuevo cargo de empleado
router.post('/cargoempleado', (req, res) => {
    const { nombre, descripcion, salario } = req.body;
    if (!nombre || !descripcion || !salario ) {
        return res.status(400).json({ success: false, message: 'Los campos nombre, descripción y salario son requeridos' });
    }

    cargoempleadoModel.createCargo(nombre, descripcion, salario, (error, result) => {
        if (error) {
            console.error('Error al crear el cargo de empleado:', error);
            return res.status(500).json({ success: false, message: 'Error al crear el cargo de empleado' });
        }
        res.json({ success: true, message: 'Cargo de empleado creado correctamente', data: result });
    });
});

// Ruta para actualizar el cargo de empleado existente
router.put('/cargoempleado/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, descripcion, salario } = req.body;

    cargoempleadoModel.updateCargo(id, nombre, descripcion, salario, (error, result) => {
        if (error) {
            console.error('Error al actualizar el cargo de empleado:', error);
            return res.status(500).json({ success: false, message: 'Error al actualizar el cargo de empleado' });
        }
        res.json({ success: true, message: 'Cargo de empleado actualizado correctamente', data: result });
    });
});

// Ruta para eliminar el cargo de empleado
router.delete('/cargoempleado/:id', (req, res) => {
    const id = req.params.id;

    cargoempleadoModel.deleteCargo(id, (error, result) => {
        if (error) {
            console.error('Error al eliminar el cargo de empleado:', error);
            return res.status(500).json({ success: false, message: 'Error al eliminar el cargo de empleado' });
        }
        res.json({ success: true, message: 'Cargo de empleado eliminado correctamente', data: result });
    });
});

module.exports = router;