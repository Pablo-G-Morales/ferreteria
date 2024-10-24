const pool = require('../config/db');

const tipovehiculoModel = {
    getAllTipovehiculo: (callback) => {
        const query = 'SELECT id_tipovehiculo, nombre FROM tipo_vehiculo';
        pool.query(query, (error, results) => {
            callback(error, results);
        });
    },

    getPaginatedTipovehiculo: (limit, offset, callback) => {
        const query = 'SELECT * FROM tipo_vehiculo LIMIT ? OFFSET ?';
        pool.query(query, [limit, offset], (error, results) => {
            callback(error, results);
        });
    },

    countTipovehiculo: (callback) => {
        const query = 'SELECT COUNT(*) AS total FROM tipo_vehiculo';
        pool.query(query, (error, result) => {
            if (error) return callback(error);
            callback(null, result[0].total);
        });
    },

    createTipovehiculo: (nombre, callback) => {
        const query = 'INSERT INTO tipo_vehiculo (nombre) VALUES (?)';
        pool.query(query, [nombre], (error, result) => {
            callback(error, result);
        });
    },

    updateTipovehiculo: (id, nombre, callback) => {
        const query = 'UPDATE tipo_vehiculo SET nombre = ? WHERE id_tipovehiculo = ?';
        pool.query(query, [nombre, id], (error, result) => {
            callback(error, result);
        });
    },

    deleteTipovehiculo: (id, callback) => {
        const query = 'DELETE FROM tipo_vehiculo WHERE id_tipovehiculo = ?';
        pool.query(query, [id], (error, result) => {
            callback(error, result);
        });
    }
};

module.exports = tipovehiculoModel;
