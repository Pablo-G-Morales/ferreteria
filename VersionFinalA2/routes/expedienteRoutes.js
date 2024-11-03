const express = require('express');
const router = express.Router();
const expedienteModel = require('../models/expedienteModel');
const generoModel = require('../models/generoModel');
const cargoempleadoModel = require('../models/cargoempleadoModel');

// Ruta para obtener todos los expedientes con paginación
router.get('/expediente', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    expedienteModel.getPaginatedExpediente(limit, offset, (error, results) => {
        if (error) {
            console.error('Error al obtener expedientes:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener Expedientes' });
        }
        expedienteModel.countExpediente((err, total) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al contar Expedientes' });
            }
            const totalPages = Math.ceil(total / limit);
            res.json({ data: results, totalPages, currentPage: page });
        });
    });
});

// Ruta para crear una nueva orden
router.post('/expediente', (req, res) => {
    const { primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, dpi, nit, fecha_nacimiento, id_genero, telefono, celular, direccion, nombre_contacto, telefono_contacto, fecha_ingreso, fecha_egreso, id_cargo } = req.body;

    // Validar campos
    if (!primer_nombre || !segundo_nombre || !primer_apellido || !segundo_apellido || !dpi || !nit || !fecha_nacimiento || !id_genero || !telefono || !celular || !direccion || !nombre_contacto || !telefono_contacto || !fecha_ingreso || !id_cargo) {
        return res.status(400).json({ success: false, message: 'Todos los campos son requeridos' });
    }

    // Depuración: Verificar que los datos estén llegando al servidor
    console.log('Datos recibidos en /expediente:', { primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, dpi, nit, fecha_nacimiento, id_genero, telefono, celular, direccion, nombre_contacto, telefono_contacto, fecha_ingreso, fecha_egreso, id_cargo });

     // Convertir fecha al formato yyyy-mm-dd si es necesario
     const formatDate = (date) => {
        if (date && date.includes('/')) {
            const [day, month, year] = date.split('/');
            return `${year}-${month}-${day}`;
        }
        return date;
    };

    const formattedFechaNacimiento = formatDate(fecha_nacimiento);
    const formattedFechaIngreso = formatDate(fecha_ingreso);
    const formattedFechaEgreso = formatDate(fecha_egreso);

    // Crear la orden en la base de datos
    expedienteModel.createExpediente(primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, dpi, nit, formattedFechaNacimiento, id_genero, telefono, celular, direccion, nombre_contacto, telefono_contacto, formattedFechaIngreso, formattedFechaEgreso, id_cargo, (error, result) => {
        if (error) {
            console.error('Error al crear la orden:', error);
            return res.status(500).json({ success: false, message: 'Error al crear expediente' });
        }
        res.json({ success: true, message: 'expediente creado correctamente', data: result });
    });
});

// Ruta para actualizar una orden existente
router.put('/expediente/:id', (req, res) => {
    const { id } = req.params;
    const { primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, dpi, nit, fecha_nacimiento, id_genero, telefono, celular, direccion, nombre_contacto, telefono_contacto, fecha_ingreso, fecha_egreso, id_cargo } = req.body;

    // Validar campos
    if (!primer_nombre || !segundo_nombre || !primer_apellido || !segundo_apellido || !dpi || !nit || !fecha_nacimiento || !id_genero || !telefono || !celular || !direccion || !nombre_contacto || !telefono_contacto || !fecha_ingreso || !id_cargo) {
        return res.status(400).json({ success: false, message: 'Todos los campos son requeridos' });
    }

    // Convertir fecha al formato yyyy-mm-dd si es necesario
    const formatDate = (date) => {
        if (date && date.includes('/')) {
            const [day, month, year] = date.split('/');
            return `${year}-${month}-${day}`;
        }
        return date;
    };

    const formattedFechaNacimiento = formatDate(fecha_nacimiento);
    const formattedFechaIngreso = formatDate(fecha_ingreso);
    const formattedFechaEgreso = formatDate(fecha_egreso);

    // Actualizar el expediente en la base de datos
    expedienteModel.updateExpediente(id, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, dpi, nit, formattedFechaNacimiento, id_genero, telefono, celular, direccion, nombre_contacto, telefono_contacto, formattedFechaIngreso, formattedFechaEgreso, id_cargo, (error, result) => {
        if (error) {
            console.error('Error al actualizar el expediente:', error);
            return res.status(500).json({ success: false, message: 'Error al actualizar el expediente' });
        }
        res.json({ success: true, message: 'Expediente actualizada correctamente', data: result });
    });
});

// Ruta para eliminar un expediente
router.delete('/expediente/:id', (req, res) => {
    const { id } = req.params;

    expedienteModel.deleteExpediente(id, (error, result) => {
        if (error) {
            console.error('Error al eliminar la expediente:', error);
            return res.status(500).json({ success: false, message: 'Error al eliminar la expediente' });
        }
        res.json({ success: true, message: 'Expediente eliminada correctamente', data: result });
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

module.exports = router;


