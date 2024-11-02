const pool = require('../config/db');

const EstadocontrasenaModel = {
    getAllEstadocontrasena: (callback) => {
        const query = 'SELECT id_estado, nombre FROM estado_contrasena';
        pool.query(query, (error, results) => {
            callback(error, results);
        });
    },

    getPaginatedEstadocontrasena: (limit, offset, callback) => {
        const query = 'SELECT * FROM estado_contrasena LIMIT ? OFFSET ?';
        pool.query(query, [limit, offset], (error, results) => {
            callback(error, results);
        });
    },

    countEstadocontrasena: (callback) => {
        const query = 'SELECT COUNT(*) AS total FROM estado_contrasena';
        pool.query(query, (error, result) => {
            if (error) return callback(error);
            callback(null, result[0].total);
        });
    },

    createEstadocontrasena: (nombre, callback) => {
        const query = 'INSERT INTO estado_contrasena (nombre) VALUES (?)';
        pool.query(query, [nombre], (error, result) => {
            callback(error, result);
        });
    },

    updateEstadocontrasena: (id, nombre, callback) => {
        const query = 'UPDATE estado_contrasena SET nombre = ? WHERE id_estado = ?';
        pool.query(query, [nombre, id], (error, result) => {
            callback(error, result);
        });
    },

    deleteEstadocontrasena: (id, callback) => {
        const query = 'DELETE FROM estado_contrasena WHERE id_estado = ?';
        pool.query(query, [id], (error, result) => {
            callback(error, result);
        });
    }
};

module.exports = EstadocontrasenaModel;