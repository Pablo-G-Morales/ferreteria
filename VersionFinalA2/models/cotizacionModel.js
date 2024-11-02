const pool = require('../config/db');

const cotizacionModel = {
    getPaginatedCotizacion: (limit, offset, callback) => {
        const query = 'SELECT id, nombre_cliente, nombre_producto, cantidad, precio_unitario, total FROM cotizacion LIMIT ? OFFSET ?';
        pool.query(query, [limit, offset], (error, results) => {
            callback(error, results);
        });
    },

    countCotizacion: (callback) => {
        const query = 'SELECT COUNT(*) AS total FROM cotizacion';
        pool.query(query, (error, results) => {
            callback(error, results[0].total);
        });
    },

    createCotizacion: (nombre_cliente, producto, cantidad, precio_unitario, total, callback) => {
        const query = 'INSERT INTO cotizacion (nombre_cliente, nombre_producto, cantidad, precio_unitario, total) VALUES (?, ?, ?, ?, ?)';
        pool.query(query, [nombre_cliente, producto, cantidad, precio_unitario, total], (error, result) => {
            callback(error, result);
        });
    },

    updateCotizacion: (id, nombre_cliente, producto, cantidad, precio_unitario, total, callback) => {
        const query = 'UPDATE cotizacion SET nombre_cliente = ?, nombre_producto = ?, cantidad = ?, precio_unitario = ?, total = ? WHERE id = ?';
        pool.query(query, [nombre_cliente, producto, cantidad, precio_unitario, total, id], (error, result) => {
            callback(error, result);
        });
    },

    deleteCotizacion: (id, callback) => {
        const query = 'DELETE FROM cotizacion WHERE id = ?';
        pool.query(query, [id], (error, result) => {
            callback(error, result);
        });
    },

    getClientes: (callback) => {
        const query = 'SELECT id, nombre FROM clientes';
        pool.query(query, (error, results) => {
            callback(error, results);
        });
    },

    getProductos: (callback) => {
        const query = 'SELECT id, nombre, precio FROM productos'; 
        pool.query(query, (error, results) => {
            callback(error, results);
        });
    },

    getPrecioProducto: (id_producto, callback) => {
        const query = 'SELECT precio FROM productos WHERE id_producto = ?'; 
        pool.query(query, [id_producto], (error, results) => {
            callback(error, results);
        });
    },
};

module.exports = cotizacionModel;