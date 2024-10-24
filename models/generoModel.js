const pool = require('../config/db');

const generoModel = {
    getAllGenero: (callback) => {
        const query = 'SELECT id_genero, nombre FROM genero';
        pool.query(query, (error, results) => {
            callback(error, results);
        });
    },

    getPaginatedGenero: (limit, offset, callback) => {
        const query = 'SELECT * FROM genero LIMIT ? OFFSET ?';
        pool.query(query, [limit, offset], (error, results) => {
            callback(error, results);
        });
    },

    countGenero: (callback) => {
        const query = 'SELECT COUNT(*) AS total FROM genero';
        pool.query(query, (error, result) => {
            if (error) return callback(error);
            callback(null, result[0].total);
        });
    },

    createGenero: (nombre, callback) => {
        const query = 'INSERT INTO genero (nombre) VALUES (?)';
        pool.query(query, [nombre], (error, result) => {
            callback(error, result);
        });
    },

    updateGenero: (id, nombre, callback) => {
        const query = 'UPDATE genero SET nombre = ? WHERE id_genero = ?';
        pool.query(query, [nombre, id], (error, result) => {
            callback(error, result);
        });
    },

    deleteGenero: (id, callback) => {
        const query = 'DELETE FROM genero WHERE id_genero = ?';
        pool.query(query, [id], (error, result) => {
            callback(error, result);
        });
    }
};

module.exports = generoModel;