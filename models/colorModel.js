const pool = require('../config/db');

const colorModel = {
    getAllColores: (callback) => {
        const query = 'SELECT id_color, nombre FROM colores';
        pool.query(query, (error, results) => {
            callback(error, results);
        });
    },

    getPaginatedColores: (limit, offset, callback) => {
        const query = 'SELECT * FROM colores LIMIT ? OFFSET ?';
        pool.query(query, [limit, offset], (error, results) => {
            callback(error, results);
        });
    },

    countColores: (callback) => {
        const query = 'SELECT COUNT(*) AS total FROM colores';
        pool.query(query, (error, result) => {
            if (error) return callback(error);
            callback(null, result[0].total);
        });
    },

    createColor: (nombre, callback) => {
        const query = 'INSERT INTO colores (nombre) VALUES (?)';
        pool.query(query, [nombre], (error, result) => {
            callback(error, result);
        });
    },

    updateColor: (id, nombre, callback) => {
        const query = 'UPDATE colores SET nombre = ? WHERE id_color = ?';
        pool.query(query, [nombre, id], (error, result) => {
            callback(error, result);
        });
    },

    deleteColor: (id, callback) => {
        const query = 'DELETE FROM colores WHERE id_color = ?';
        pool.query(query, [id], (error, result) => {
            callback(error, result);
        });
    }
};

module.exports = colorModel;
