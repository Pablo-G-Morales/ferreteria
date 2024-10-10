const pool = require('../config/db');

const ordenModel = {

    getAllOrden: (callback) => {
        const query = 'SELECT idorden, id_proveedor, id_vehiculo, id_empleado, nit, responsable, fecha, direccion, total FROM orden_compra';
        pool.query(query, (error, results) => {
            callback(error, results);
        });
    },

    // Obtener ordenes con paginación
    getPaginatedOrden: (limit, offset, callback) => {
        const query = `SELECT orden_compra.*, 
                          proveedores.nombre AS proveedor,
                          vehiculo.nombre AS vehiculo,
                          empleado.nombre AS empleado
                       FROM orden_compra
                       LEFT JOIN proveedores ON orden_compra.id_proveedor = proveedores.id_proveedor
                       LEFT JOIN vehiculo ON orden_compra.id_vehiculo = vehiculo.id_vehiculo 
                       LEFT JOIN empleado ON orden_compra.id_empleado = empleado.id_empleado  
                       LIMIT ? OFFSET ?`;
        pool.query(query, [limit, offset], (error, results) => {
            callback(error, results);
        });
    },

    // Contar el total de ordenes
    countOrden: (callback) => {
        const query = 'SELECT COUNT(*) AS total FROM orden_compra';
        pool.query(query, (error, result) => {
            if (error) return callback(error);
            callback(null, result[0].total);
        });
    },

    // Crear una orden
    createOrden: (id_proveedor, id_vehiculo, id_empleado, nit, responsable, fecha, direccion, total, callback) => {
        const query = `INSERT INTO orden_compra (id_proveedor, id_vehiculo, id_empleado, nit, responsable, fecha, direccion, total) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        pool.query(query, [id_proveedor, id_vehiculo, id_empleado, nit, responsable, fecha, direccion, total], (error, result) => {
            callback(error, result);
        });
    },

    // Actualizar una orden
    updateOrden: (id, id_proveedor, id_vehiculo, id_empleado, nit, responsable, fecha, direccion, total, callback) => {
        const query = `UPDATE orden_compra 
                       SET id_proveedor = ?, id_vehiculo = ?, id_empleado = ?, nit = ?, responsable = ?, fecha = ?, direccion = ?, total = ?
                       WHERE idorden = ?`;
        pool.query(query, [id_proveedor, id_vehiculo, id_empleado, nit, responsable, fecha, direccion, total, id], (error, result) => {
            callback(error, result);
        });
    },

    // Eliminar una orden
    deleteOrden: (id, callback) => {
        const query = 'DELETE FROM orden_compra WHERE idorden = ?';
        pool.query(query, [id], (error, result) => {
            callback(error, result);
        });
    }
};

module.exports = ordenModel;
