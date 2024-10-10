const pool = require('../config/db');

const detalleordenModel = {
    // Obtener órdenes con paginación
    getPaginatedDetalleorden: (limit, offset, callback) => {
        const query = `
            SELECT detalle_orden.*, 
                   productos.nombre AS producto
            FROM detalle_orden
            LEFT JOIN orden_compra ON detalle_orden.idorden = orden_compra.idorden
            LEFT JOIN productos ON detalle_orden.id_producto = productos.id_producto 
            LIMIT ? OFFSET ?`;

        pool.query(query, [limit, offset], (error, results) => {
            callback(error, results);
        });
    },

    // Contar el total de detalles de orden proveedores
    countDetalleorden: (callback) => {
        const query = 'SELECT COUNT(*) AS total FROM detalle_orden';

        pool.query(query, (error, result) => {
            if (error) return callback(error);
            callback(null, result[0].total);
        });
    },

    // Crear un detalle de orden
    createDetalleorden: (idorden, id_producto, precio, cantidad, subtotal, callback) => {
        const query = `
            INSERT INTO detalle_orden (idorden, id_producto, precio, cantidad, subtotal) 
            VALUES (?, ?, ?, ?, ?)`;

        pool.query(query, [idorden, id_producto, precio, cantidad, subtotal], (error, result) => {
            callback(error, result);
        });
    },

    // Actualizar un detalle de orden
    updateDetalleorden: (id, idorden, id_producto, precio, cantidad, subtotal, callback) => {
        const query = `
            UPDATE detalle_orden 
            SET idorden = ?, id_producto = ?, precio = ?, cantidad = ?, subtotal = ?
            WHERE iddetalleorden = ?`;

        pool.query(query, [idorden, id_producto, precio, cantidad, subtotal, id], (error, result) => {
            callback(error, result);
        });
    },

    // Eliminar un detalle de orden
    deleteDetalleorden: (id, callback) => {
        const query = 'DELETE FROM detalle_orden WHERE iddetalleorden = ?';

        pool.query(query, [id], (error, result) => {
            callback(error, result);
        });
    }
};

module.exports = detalleordenModel;
