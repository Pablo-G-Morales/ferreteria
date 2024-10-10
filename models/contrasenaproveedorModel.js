const pool = require('../config/db');

const contrasenaproveedorModel = {

    getAllContrasenaproveedor: (callback) => {
        const query = 'SELECT id_contrasena, idorden, id_proveedor, fecha_inicio, fecha_limite, id_tipopago, id_estado, total FROM contrasenaproveedor';
        pool.query(query, (error, results) => {
            callback(error, results);
        });
    },

    // Obtener ordenes con paginación
    getPaginatedContrasenaproveedor: (limit, offset, callback) => {
        const query = `SELECT contrasenaproveedor.*, 
                          proveedores.nombre AS proveedor,
                          tipo_pago.nombre AS tipopago,
                          estado_contrasena.nombre AS estado
                       FROM contrasenaproveedor
                       LEFT JOIN proveedores ON contrasenaproveedor.id_proveedor = proveedores.id_proveedor
                       LEFT JOIN tipo_pago ON contrasenaproveedor.id_tipopago = tipo_pago.id_tipopago
                       LEFT JOIN estado_contrasena ON contrasenaproveedor.id_estado = estado_contrasena.id_estado  
                       LIMIT ? OFFSET ?`;
        pool.query(query, [limit, offset], (error, results) => {
            callback(error, results);
        });
    },

    // Contar el total de ordenes
    countContrasenaproveedor: (callback) => {
        const query = 'SELECT COUNT(*) AS total FROM contrasenaproveedor';
        pool.query(query, (error, result) => {
            if (error) return callback(error);
            callback(null, result[0].total);
        });
    },

    // Crear una orden
    createContrasenaproveedor: (idorden, id_proveedor, fecha_inicio, fecha_limite, id_tipopago, id_estado, total, callback) => {
        const query = `INSERT INTO contrasenaproveedor (idorden, id_proveedor, fecha_inicio, fecha_limite, id_tipopago, id_estado, total) 
                       VALUES (?, ?, ?, ?, ?, ?, ?)`;
        pool.query(query, [idorden, id_proveedor, fecha_inicio, fecha_limite, id_tipopago, id_estado, total], (error, result) => {
            callback(error, result);
        });
    },

    // Actualizar una orden
    updateContrasenaproveedor: (id, idorden, id_proveedor, fecha_inicio, fecha_limite, id_tipopago, id_estado, total, callback) => {
        const query = `UPDATE contrasenaproveedor
                       SET idorden = ?, id_proveedor = ?, fecha_inicio = ?, fecha_limite = ?, id_tipopago = ?, id_estado = ?, total = ?
                       WHERE id_contrasena = ?`;
        pool.query(query, [idorden, id_proveedor, fecha_inicio, fecha_limite, id_tipopago, id_estado, total, id], (error, result) => {
            callback(error, result);
        });
    },

    // Eliminar una orden
    deleteContrasenaproveedor: (id, callback) => {
        const query = 'DELETE FROM contrasenaproveedor WHERE id_contrasena = ?';
        pool.query(query, [id], (error, result) => {
            callback(error, result);
        });
    }
};

module.exports = contrasenaproveedorModel;