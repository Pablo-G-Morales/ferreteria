const pool = require('../config/db');

const detalleCompraModel = {
    // Obtener todos los detalles de compras con paginación
    getPaginatedDetalleCompras: (limit, offset, callback) => {
        const query = `SELECT detalle_compras.*, compras.fecha_compra, productos.nombre AS producto 
                       FROM detalle_compras
                       LEFT JOIN compras ON detalle_compras.id_compra = compras.id_compra
                       LEFT JOIN productos ON detalle_compras.id_producto = productos.id_producto
                       LIMIT ? OFFSET ?`;
        pool.query(query, [limit, offset], (error, results) => {
            callback(error, results);
        });
    },

    // Contar el total de detalles de compras
    countDetalleCompras: (callback) => {
        const query = 'SELECT COUNT(*) AS total FROM detalle_compras';
        pool.query(query, (error, result) => {
            if (error) return callback(error);
            callback(null, result[0].total);
        });
    },

    // Crear un nuevo detalle de compra
    createDetalleCompra: (id_compra, id_producto, cantidad, precio_unitario, subtotal, callback) => {
        const query = `INSERT INTO detalle_compras (id_compra, id_producto, cantidad, precio_unitario, subtotal) 
                       VALUES (?, ?, ?, ?, ?)`;
        pool.query(query, [id_compra, id_producto, cantidad, precio_unitario, subtotal], (error, result) => {
            callback(error, result);
        });
    },

    // Actualizar un detalle de compra existente
    updateDetalleCompra: (id, id_compra, id_producto, cantidad, precio_unitario, subtotal, callback) => {
        const query = `UPDATE detalle_compras 
                       SET id_compra = ?, id_producto = ?, cantidad = ?, precio_unitario = ?, subtotal = ? 
                       WHERE id_detalle_compra = ?`;
        pool.query(query, [id_compra, id_producto, cantidad, precio_unitario, subtotal, id], (error, result) => {
            callback(error, result);
        });
    },

    // Eliminar un detalle de compra
    deleteDetalleCompra: (id, callback) => {
        const query = 'DELETE FROM detalle_compras WHERE id_detalle_compra = ?';
        pool.query(query, [id], (error, result) => {
            callback(error, result);
        });
    }
};

module.exports = detalleCompraModel;
