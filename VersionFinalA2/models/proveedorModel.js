const pool = require('../config/db');

const proveedorModel = {
    getAllProveedores: (callback) => {
        const query = 'SELECT id_proveedor, nombre FROM proveedores';
        pool.query(query, (error, results) => {
            callback(error, results);
        });
    },

    getPaginatedProveedores: (limit, offset, callback) => {
        const query = 'SELECT * FROM proveedores LIMIT ? OFFSET ?';
        pool.query(query, [limit, offset], (error, results) => {
            callback(error, results);
        });
    },

    countProveedores: (callback) => {
        const query = 'SELECT COUNT(*) AS total FROM proveedores';
        pool.query(query, (error, result) => {
            if (error) return callback(error);
            callback(null, result[0].total);
        });
    },

    createProveedor: (nombre, direccion, telefono, correo, celular, contacto, pagina_web, callback) => {
        const query = 'INSERT INTO proveedores (nombre, direccion, telefono, correo, celular, contacto, pagina_web) VALUES (?, ?, ?, ?, ?, ?, ?)';
        pool.query(query, [nombre, direccion, telefono, correo, celular, contacto, pagina_web], (error, result) => {
            callback(error, result);
        });
    },

    updateProveedor: (id, nombre, direccion, telefono, correo, celular, contacto, pagina_web, callback) => {
        const query = 'UPDATE proveedores SET nombre = ?, direccion = ?, telefono = ?, correo = ?, celular = ?, contacto = ?, pagina_web = ? WHERE id_proveedor = ?';
        pool.query(query, [nombre, direccion, telefono, correo, celular, contacto, pagina_web, id], (error, result) => {
            callback(error, result);
        });
    },

    deleteProveedor: (id, callback) => {
        const query = 'DELETE FROM proveedores WHERE id_proveedor = ?';
        pool.query(query, [id], (error, result) => {
            callback(error, result);
        });
    }
};

module.exports = proveedorModel;
