const express = require('express');
const router = express.Router();
const contrasenaproveedorModel = require('../models/contrasenaproveedorModel');
const orden_compraModel = require('../models/orden_compraModel');
const proveedorModel = require('../models/proveedorModel');
const tipopagoModel = require('../models/tipopagoModel');
const estadocontrasenaModel = require('../models/estadocontrasenaModel');

// Ruta para obtener todas las Contraseña con paginación
router.get('/contrasenaproveedor', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    contrasenaproveedorModel.getPaginatedContrasenaproveedor(limit, offset, (error, results) => {
        if (error) {
            console.error('Error al obtener las contraseñas:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener las contraseñas' });
        }
        contrasenaproveedorModel.countContrasenaproveedor((err, total) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al contar las contraseñas' });
            }
            const totalPages = Math.ceil(total / limit);
            res.json({ data: results, totalPages, currentPage: page });
        });
    });
});

// Ruta para crear una nueva Contraseña
router.post('/contrasenaproveedor', (req, res) => {
    const { idorden, id_proveedor, fecha_inicio, fecha_limite, id_tipopago, id_estado, total } = req.body;

    // Validar campos
    if ( !idorden || !id_proveedor || !fecha_inicio || !fecha_limite || !id_tipopago || !id_estado || !total) {
        return res.status(400).json({ success: false, message: 'Todos los campos son requeridos' });
    }

    // Depuración: Verificar que los datos estén llegando al servidor
    console.log('Datos recibidos en /contrasenaproveedor:', { idorden, id_proveedor, fecha_inicio, fecha_limite, id_tipopago, id_estado, total });

    // Convertir fecha al formato yyyy-mm-dd si es necesario
    let formattedDate = fecha_inicio;
    if (fecha_inicio.includes('/')) {
        const [day, month, year] = fecha_inicio.split('/');
        formattedDate = `${year}-${month}-${day}`;
    }

    let formattedDatetwo = fecha_limite;
    if (fecha_limite.includes('/')) {
        const [day, month, year] = fecha_limite.split('/');
        formattedDatetwo = `${year}-${month}-${day}`;
    }

    // Crear la orden en la base de datos
    contrasenaproveedorModel.createContrasenaproveedor(idorden, id_proveedor, formattedDate, formattedDatetwo, id_tipopago, id_estado, total, (error, result) => {
        if (error) {
            console.error('Error al crear Contraseña:', error);
            return res.status(500).json({ success: false, message: 'Error al crear Contraseña' });
        }
        res.json({ success: true, message: 'Contraseña creada correctamente', data: result });
    });
});

// Ruta para actualizar un Contraseña existente
router.put('/contrasenaproveedor/:id', (req, res) => {
    const { id } = req.params;
    const { idorden, id_proveedor, fecha_inicio, fecha_limite, id_tipopago, id_estado, total } = req.body;

    // Validar campos
    if (!idorden || !id_proveedor || !fecha_inicio || !fecha_limite || !id_tipopago || !id_estado || !total) {
        return res.status(400).json({ success: false, message: 'Todos los campos son requeridos' });
    }

    // Convertir fecha al formato yyyy-mm-dd si es necesario
    let formattedDate = fecha_inicio;
    if (fecha_inicio.includes('/')) {
        const [day, month, year] = fecha_inicio.split('/');
        formattedDate = `${year}-${month}-${day}`;
    }

    let formattedDatetwo = fecha_limite;
    if (fecha_limite.includes('/')) {
        const [day, month, year] = fecha_limite.split('/');
        formattedDatetwo = `${year}-${month}-${day}`;
    }

    // Actualizar Contraseña en la base de datos
    contrasenaproveedorModel.updateContrasenaproveedor(id, idorden, id_proveedor, formattedDate, formattedDatetwo, id_tipopago, id_estado, total, (error, result) => {
        if (error) {
            console.error('Error al actualizar Contraseña:', error);
            return res.status(500).json({ success: false, message: 'Error al actualizar Contraseña' });
        }
        res.json({ success: true, message: 'Contraseña actualizada correctamente', data: result });
    });
});

// Ruta para eliminar una Contraseña
router.delete('/contrasenaproveedor/:id', (req, res) => {
    const { id } = req.params;

    contrasenaproveedorModel.deleteContrasenaproveedor(id, (error, result) => {
        if (error) {
            console.error('Error al eliminar Contraseña:', error);
            return res.status(500).json({ success: false, message: 'Error al eliminar la contraseña' });
        }
        res.json({ success: true, message: 'Contraseña eliminada correctamente', data: result });
    });
});

// Ruta para obtener la lista de ordenes
router.get('/ordencompra-list', (req, res) => {
    orden_compraModel.getAllOrden((error, results) => {
        if (error) {
            console.error('Error al obtener ordenes:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener orden' });
        }
        res.json(results); // Enviar la lista de ordenes
    });
});

// Ruta para obtener la lista de proveedores 
router.get('/proveedores-list', (req, res) => {
    proveedorModel.getAllProveedores((error, results) => {
        if (error) {
            console.error('Error al obtener proveedores:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener proveedores' });
        }
        res.json(results); // Enviar los proveedores para ser usados en el combo box
    });
});

// Ruta para obtener la lista de tipo de pago 
router.get('/tipopago-list', (req, res) => {
    tipopagoModel.getAllTipopago((error, results) => {
        if (error) {
            console.error('Error al obtener el tipo de pago:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener los tipos de pago' });
        }
        res.json(results); // Enviar los tipos de pago para ser usados en el combo box
    });
});

// Ruta para obtener la lista de estado de contraseña 
router.get('/estadocontrasena-list', (req, res) => {
    estadocontrasenaModel.getAllEstadocontrasena((error, results) => {
        if (error) {
            console.error('Error al obtener el estado de contraseña:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener los estados de contraseña' });
        }
        res.json(results); // Enviar los estados de contraseña para ser usados en el combo box
    });
});

module.exports = router;