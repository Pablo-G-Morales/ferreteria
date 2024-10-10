const express = require('express');
const router = express.Router();
const empleadoModel = require('../models/empleadoModel');

// Ruta para obtener todos los vehiculos con paginación
router.get('/empleado', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    empleadoModel.getPaginatedEmpleado(limit, offset, (error, results) => {
        if (error) {
            console.error('Error al obtener empleados:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener empleados' });
        }

        empleadoModel.countEmpleado((err, total) => {
            if (err) {
                console.error('Error al contar empleados:', err);
                return res.status(500).json({ success: false, message: 'Error al contar empleados' });
            }

            const totalPages = Math.ceil(total / limit);
            res.json({ success: true, data: results, totalPages, currentPage: page });
        });
    });
});

// Ruta para crear un nuevo empleado
router.post('/empleado', (req, res) => {
    const { nombre, dpi, nit, telefono, direccion, cargo, salario } = req.body;

    if (!nombre || !dpi || !nit || !telefono || !direccion || !cargo || !salario) {
        return res.status(400).json({ success: false, message: 'Todos los campos del empleado son requeridos' });
    }

    // Validar que el salario sea un número positivo
    if (isNaN(salario) || salario <= 0) {
        return res.status(400).json({ success: false, message: 'El salario debe ser un número positivo' });
    }

    empleadoModel.createEmpleado(nombre, dpi, nit, telefono, direccion, cargo, salario, (error, result) => {
        if (error) {
            console.error('Error al crear el empleado:', error);
            return res.status(500).json({ success: false, message: 'Error al crear el empleado' });
        }
        res.json({ success: true, message: 'Empleado creado correctamente', data: result });
    });
});

// Ruta para actualizar un empleado existente
router.put('/empleado/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, dpi, nit, telefono, direccion, cargo, salario } = req.body;

    if (!nombre || !dpi || !nit || !telefono || !direccion || !cargo || !salario) {
        return res.status(400).json({ success: false, message: 'Todos los campos del empleado son requeridos' });
    }

    // Validar que el salario sea un número positivo
    if (isNaN(salario) || salario <= 0) {
        return res.status(400).json({ success: false, message: 'El salario debe ser un número positivo' });
    }

    empleadoModel.updateEmpleado(id, nombre, dpi, nit, telefono, direccion, cargo, salario, (error, result) => {
        if (error) {
            console.error('Error al actualizar el empleado:', error);
            return res.status(500).json({ success: false, message: 'Error al actualizar el empleado' });
        }
        res.json({ success: true, message: 'Empleado actualizado correctamente', data: result });
    });
});

// Ruta para eliminar un empleado
router.delete('/empleado/:id', (req, res) => {
    const id = req.params.id;

    empleadoModel.deleteEmpleado(id, (error, result) => {
        if (error) {
            console.error('Error al eliminar el empleado:', error);
            return res.status(500).json({ success: false, message: 'Error al eliminar el empleado' });
        }
        res.json({ success: true, message: 'Empleado eliminado correctamente', data: result });
    });
});

module.exports = router;
