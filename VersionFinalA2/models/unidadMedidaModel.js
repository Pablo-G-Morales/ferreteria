const pool = require('../config/db');

const unidadMedidaModel = {
    getAllUnidades: (callback) => {
        const query = 'SELECT id_unidad, nombre FROM unidadesmedida';
        pool.query(query, (error, results) => {
            callback(error, results);
        });
    },

    getPaginatedUnidades: (limit, offset, callback) => {
        const query = 'SELECT * FROM unidadesmedida LIMIT ? OFFSET ?';
        pool.query(query, [limit, offset], (error, results) => {
            callback(error, results);
        });
    },

    countUnidades: (callback) => {
        const query = 'SELECT COUNT(*) AS total FROM unidadesmedida';
        pool.query(query, (error, result) => {
            if (error) return callback(error);
            callback(null, result[0].total);
        });
    },

    createUnidad: (nombre, descripcion, callback) => {
        const query = 'INSERT INTO unidadesmedida (nombre, descripcion) VALUES (?, ?)';
        pool.query(query, [nombre, descripcion], (error, result) => {
            callback(error, result);
        });
    },

    updateUnidad: (id, nombre, descripcion, callback) => {
        const query = 'UPDATE unidadesmedida SET nombre = ?, descripcion = ? WHERE id_unidad = ?';
        pool.query(query, [nombre, descripcion, id], (error, result) => {
            callback(error, result);
        });
    },

    deleteUnidad: (id, callback) => {
        const query = 'DELETE FROM unidadesmedida WHERE id_unidad = ?';
        pool.query(query, [id], (error, result) => {
            callback(error, result);
        });
    }
};

module.exports = unidadMedidaModel;
