const express = require('express');
const router = express.Router();
const ordenModel = require('../models/orden_compraModel');
const proveedorModel = require('../models/proveedorModel');
const vehiculoModel = require('../models/vehiculoModel');
const empleadoModel = require('../models/empleadoModel');

// Ruta para obtener todos las ordenes con paginación
router.get('/ordencompra', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    ordenModel.getPaginatedOrden(limit, offset, (error, results) => {
        if (error) {
            console.error('Error al obtener ordenes:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener ordenes' });
        }
        ordenModel.countOrden((err, total) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al contar ordenes' });
            }
            const totalPages = Math.ceil(total / limit);
            res.json({ data: results, totalPages, currentPage: page });
        });
    });
});

// Ruta para crear una nueva orden
router.post('/ordencompra', (req, res) => {
    const { id_proveedor, id_vehiculo, id_empleado, nit, responsable, fecha, direccion, total } = req.body;

    // Validar campos
    if (!id_proveedor || !id_vehiculo || !id_empleado || !nit || !responsable || !fecha ||!direccion || !total) {
        return res.status(400).json({ success: false, message: 'Todos los campos son requeridos' });
    }

    // Depuración: Verificar que los datos estén llegando al servidor
    console.log('Datos recibidos en /ordencompra:', { id_proveedor, id_vehiculo, id_empleado, nit, responsable, fecha, direccion, total });

    // Convertir fecha al formato yyyy-mm-dd si es necesario
    let formattedDate = fecha;
    if (fecha.includes('/')) {
        const [day, month, year] = fecha.split('/');
        formattedDate = `${year}-${month}-${day}`;
    }

    // Crear la orden en la base de datos
    ordenModel.createOrden(id_proveedor, id_vehiculo, id_empleado, nit, responsable, formattedDate, direccion, total, (error, result) => {
        if (error) {
            console.error('Error al crear la orden:', error);
            return res.status(500).json({ success: false, message: 'Error al crear la orden' });
        }
        res.json({ success: true, message: 'orden creada correctamente', data: result });
    });
});

// Ruta para actualizar una orden existente
router.put('/ordencompra/:id', (req, res) => {
    const { id } = req.params;
    const { id_proveedor, id_vehiculo, id_empleado, nit, responsable, fecha, direccion, total } = req.body;

    // Validar campos
    if (!id_proveedor || !id_vehiculo || !id_empleado || !nit || !responsable || !fecha ||!direccion || !total) {
        return res.status(400).json({ success: false, message: 'Todos los campos son requeridos' });
    }

    // Convertir fecha al formato yyyy-mm-dd si es necesario
    let formattedDate = fecha;
    if (fecha.includes('/')) {
        const [day, month, year] = fecha.split('/');
        formattedDate = `${year}-${month}-${day}`;
    }

    // Actualizar la orden en la base de datos
    ordenModel.updateCompra(id, id_proveedor, id_vehiculo, id_empleado, nit, responsable, formattedDate, direccion, total, (error, result) => {
        if (error) {
            console.error('Error al actualizar la orden:', error);
            return res.status(500).json({ success: false, message: 'Error al actualizar la orden' });
        }
        res.json({ success: true, message: 'Orden actualizada correctamente', data: result });
    });
});

// Ruta para eliminar una orden
router.delete('/ordencompra/:id', (req, res) => {
    const { id } = req.params;

    ordenModel.deleteOrden(id, (error, result) => {
        if (error) {
            console.error('Error al eliminar la orden:', error);
            return res.status(500).json({ success: false, message: 'Error al eliminar la orden' });
        }
        res.json({ success: true, message: 'Orden eliminada correctamente', data: result });
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

// Ruta para obtener la lista de vehiculos
router.get('/empleado-list', (req, res) => {
    empleadoModel.getAllEmpleado((error, results) => {
        if (error) {
            console.error('Error al obtener vehiculos:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener vehiculos' });
        }
        res.json(results); // Enviar la lista de vehiculos
    });
});

// Ruta para obtener la lista de vehiculos
router.get('/vehiculo-list', (req, res) => {
    vehiculoModel.getAllVehiculo((error, results) => {
        if (error) {
            console.error('Error al obtener vehiculos:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener vehiculos' });
        }
        res.json(results); // Enviar la lista de vehiculos
    });
});

module.exports = router;


