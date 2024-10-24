const express = require('express');
const router = express.Router();
const vehiculoModel = require('../models/vehiculoModel');
const marcavehiculoModel = require('../models/marcavehiculoModel');
const tipovehiculoModel = require('../models/tipovehiculoModel');

// Ruta para obtener todos los vehiculos con paginación
router.get('/vehiculo', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    vehiculoModel.getPaginatedVehiculo(limit, offset, (error, results) => {
        if (error) {
            console.error('Error al obtener vehiculos:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener vehiculos' });
        }

        vehiculoModel.countVehiculo((err, total) => {
            if (err) {
                console.error('Error al contar vehiculos:', err);
                return res.status(500).json({ success: false, message: 'Error al contar vehiculos' });
            }

            const totalPages = Math.ceil(total / limit);
            res.json({ success: true, data: results, totalPages, currentPage: page });
        });
    });
});

// Ruta para crear un nuevo vehiculo
router.post('/vehiculo', (req, res) => {
    const { nombre, placa, id_tipovehiculo, id_marcavehiculo, color, propietario, precio } = req.body;

    if (!nombre || !placa || !id_tipovehiculo || !id_marcavehiculo || !color || !propietario || !precio) {
        return res.status(400).json({ success: false, message: 'Todos los campos del vehiculo son requeridos' });
    }

    // Validar que precio sea un número positivo
    if (isNaN(precio) || precio <= 0) {
        return res.status(400).json({ success: false, message: 'El precio debe ser un número positivo' });
    }

    vehiculoModel.createVehiculo(nombre, placa, id_tipovehiculo, id_marcavehiculo, color, propietario, precio, (error, result) => {
        if (error) {
            console.error('Error al crear el vehiculo:', error);
            return res.status(500).json({ success: false, message: 'Error al crear el vehiculo' });
        }
        res.json({ success: true, message: 'Vehiculo creado correctamente', data: result });
    });
});

// Ruta para actualizar un vehiculo existente
router.put('/vehiculo/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, placa, id_tipovehiculo, id_marcavehiculo, color, propietario, precio } = req.body;

    if (!nombre || !placa || !id_tipovehiculo || !id_marcavehiculo || !color || !propietario || !precio) {
        return res.status(400).json({ success: false, message: 'Todos los campos del vehiculo son requeridos' });
    }

    // Validar que precio sea un número positivo
    if (isNaN(precio) || precio <= 0) {
        return res.status(400).json({ success: false, message: 'El precio debe ser un número positivo' });
    }

    vehiculoModel.updateVehiculo(id, nombre, placa, id_tipovehiculo, id_marcavehiculo, color, propietario, precio, (error, result) => {
        if (error) {
            console.error('Error al actualizar el vehiculo:', error);
            return res.status(500).json({ success: false, message: 'Error al actualizar el vehiculo' });
        }
        res.json({ success: true, message: 'Vehiculo actualizado correctamente', data: result });
    });
});

// Ruta para eliminar un vehiculo
router.delete('/vehiculo/:id', (req, res) => {
    const id = req.params.id;

    vehiculoModel.deleteVehiculo(id, (error, result) => {
        if (error) {
            console.error('Error al eliminar el vehiculo:', error);
            return res.status(500).json({ success: false, message: 'Error al eliminar el vehiculo' });
        }
        res.json({ success: true, message: 'Vehiculo eliminado correctamente', data: result });
    });
});

// Ruta para obtener la lista de las marcas de vehiculo
router.get('/marcavehiculo-list', (req, res) => {
    marcavehiculoModel.getAllMarcavehiculo((error, results) => {
        if (error) {
            console.error('Error al obtener la marca de vehiculo:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener las marcas de vehiculo' });
        }
        res.json(results); // Enviar las marcas de vehiculo para ser usados en el combo box
    });
});

router.get('/tipovehiculo-list', (req, res) => {
    tipovehiculoModel.getAllTipovehiculo((error, results) => {
        if (error) {
            console.error('Error al obtener el tipo de vehiculo:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener los tipos de vehiculo' });
        }
        res.json(results); // Enviar los tipos de vehiculo para ser usados en el combo box
    });
});

module.exports = router;
