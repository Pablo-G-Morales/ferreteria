const express = require('express');
const router = express.Router();
const empleadoModel = require('../models/empleadoModel');
const expedienteModel = require('../models/expedienteModel');


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
    const { nombre_completo, id_expediente } = req.body;

    if (!nombre_completo || !id_expediente) {
        return res.status(400).json({ success: false, message: 'Todos los campos del empleado son requeridos' });
    }


    empleadoModel.createEmpleado(nombre_completo, id_expediente, (error, result) => {
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
    const { nombre_completo, id_expediente } = req.body;

    if (!nombre_completo || !id_expediente) {
        return res.status(400).json({ success: false, message: 'Todos los campos del empleado son requeridos' });
    }

    empleadoModel.updateEmpleado(id, nombre_completo, id_expediente, (error, result) => {
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

// Ruta para obtener la lista de los expedientes
router.get('/expediente-list', (req, res) => {
    expedienteModel.getAllExpediente((error, results) => {
        if (error) {
            console.error('Error al obtener el expediente:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener los cargos de empleado' });
        }
        res.json(results); // Enviar los expedientes para ser usados en el combo box
    });
});

module.exports = router;
