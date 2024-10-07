const pool = require('../config/db');

const compraModel = {
    // Obtener compras con paginación
    getPaginatedCompras: (limit, offset, callback) => {
        const query = `SELECT compras.*, proveedores.nombre AS proveedor 
                       FROM compras 
                       LEFT JOIN proveedores ON compras.id_proveedor = proveedores.id_proveedor 
                       LIMIT ? OFFSET ?`;
        pool.query(query, [limit, offset], (error, results) => {
            if (error) {
                console.error('Error al obtener compras:', error);
                return callback(error);
            }
            callback(null, results);
        });
    },

    // Contar el total de compras
    countCompras: (callback) => {
        const query = 'SELECT COUNT(*) AS total FROM compras';
        pool.query(query, (error, result) => {
            if (error) {
                console.error('Error al contar compras:', error);
                return callback(error);
            }
            callback(null, result[0].total);
        });
    },

    // Crear una compra
    createCompra: (id_proveedor, fecha_compra, total, callback) => {
        const query = `INSERT INTO compras (id_proveedor, fecha_compra, total) 
                       VALUES (?, ?, ?)`;
        pool.query(query, [id_proveedor, fecha_compra, total], (error, result) => {
            if (error) {
                console.error('Error al crear la compra:', error);
                return callback(error);
            }
            callback(null, result);
        });
    },

    // Actualizar una compra existente
    updateCompra: (id, id_proveedor, fecha_compra, total, callback) => {
        const query = `UPDATE compras 
                       SET id_proveedor = ?, fecha_compra = ?, total = ? 
                       WHERE id_compra = ?`;
        pool.query(query, [id_proveedor, fecha_compra, total, id], (error, result) => {
            if (error) {
                console.error('Error al actualizar la compra:', error);
                return callback(error);
            }
            callback(null, result);
        });
    },

    // Eliminar una compra
    deleteCompra: (id, callback) => {
        const query = 'DELETE FROM compras WHERE id_compra = ?';
        pool.query(query, [id], (error, result) => {
            if (error) {
                console.error('Error al eliminar la compra:', error);
                return callback(error);
            }
            callback(null, result);
        });
    }
};

module.exports = compraModel;
