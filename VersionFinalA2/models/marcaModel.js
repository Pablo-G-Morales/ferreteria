const pool = require('../config/db');

const marcaModel = {
    getAllMarcas: (callback) => {
        const query = 'SELECT id_marca, nombre FROM marcas';
        pool.query(query, (error, results) => {
            callback(error, results);
        });
    },

    getPaginatedMarcas: (limit, offset, callback) => {
        const query = 'SELECT * FROM marcas LIMIT ? OFFSET ?';
        pool.query(query, [limit, offset], (error, results) => {
            callback(error, results);
        });
    },

    countMarcas: (callback) => {
        const query = 'SELECT COUNT(*) AS total FROM marcas';
        pool.query(query, (error, result) => {
            if (error) return callback(error);
            callback(null, result[0].total);
        });
    },

    createMarca: (nombre, id_proveedor, callback) => {
        const query = 'INSERT INTO marcas (nombre, id_proveedor) VALUES (?, ?)';
        pool.query(query, [nombre, id_proveedor], (error, result) => {
            callback(error, result);
        });
    },

    updateMarca: (id, nombre, id_proveedor, callback) => {
        const query = 'UPDATE marcas SET nombre = ?, id_proveedor = ? WHERE id_marca = ?';
        pool.query(query, [nombre, id_proveedor, id], (error, result) => {
            callback(error, result);
        });
    },

    deleteMarca: (id, callback) => {
        const query = 'DELETE FROM marcas WHERE id_marca = ?';
        pool.query(query, [id], (error, result) => {
            callback(error, result);
        });
    }
};

module.exports = marcaModel;
