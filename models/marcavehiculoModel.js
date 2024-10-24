const pool = require('../config/db');

const marcavehiculoModel = {
    getAllMarcavehiculo: (callback) => {
        const query = 'SELECT id_marcavehiculo, nombre FROM marca_vehiculo';
        pool.query(query, (error, results) => {
            callback(error, results);
        });
    },

    getPaginatedMarcavehiculo: (limit, offset, callback) => {
        const query = 'SELECT * FROM marca_vehiculo LIMIT ? OFFSET ?';
        pool.query(query, [limit, offset], (error, results) => {
            callback(error, results);
        });
    },

    countMarcavehiculo: (callback) => {
        const query = 'SELECT COUNT(*) AS total FROM marca_vehiculo';
        pool.query(query, (error, result) => {
            if (error) return callback(error);
            callback(null, result[0].total);
        });
    },

    createMarcavehiculo: (nombre, callback) => {
        const query = 'INSERT INTO marca_vehiculo (nombre) VALUES (?)';
        pool.query(query, [nombre], (error, result) => {
            callback(error, result);
        });
    },

    updateMarcavehiculo: (id, nombre, callback) => {
        const query = 'UPDATE marca_vehiculo SET nombre = ? WHERE id_marcavehiculo = ?';
        pool.query(query, [nombre, id], (error, result) => {
            callback(error, result);
        });
    },

    deleteMarcavehiculo: (id, callback) => {
        const query = 'DELETE FROM marca_vehiculo WHERE id_marcavehiculo = ?';
        pool.query(query, [id], (error, result) => {
            callback(error, result);
        });
    }
};

module.exports = marcavehiculoModel;