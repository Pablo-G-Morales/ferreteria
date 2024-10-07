const pool = require('../config/db');

const categoriaModel = {
    getAllCategorias: (callback) => {
        const query = 'SELECT id_categoria, nombre FROM categorias';
        pool.query(query, (error, results) => {
            callback(error, results);
        });
    },

    getPaginatedCategorias: (limit, offset, callback) => {
        const query = 'SELECT * FROM categorias LIMIT ? OFFSET ?';
        pool.query(query, [limit, offset], (error, results) => {
            callback(error, results);
        });
    },

    countCategorias: (callback) => {
        const query = 'SELECT COUNT(*) AS total FROM categorias';
        pool.query(query, (error, result) => {
            if (error) return callback(error);
            callback(null, result[0].total);
        });
    },

    createCategoria: (nombre, descripcion, callback) => {
        const query = 'INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)';
        pool.query(query, [nombre, descripcion], (error, result) => {
            callback(error, result);
        });
    },

    updateCategoria: (id, nombre, descripcion, callback) => {
        const query = 'UPDATE categorias SET nombre = ?, descripcion = ? WHERE id_categoria = ?';
        pool.query(query, [nombre, descripcion, id], (error, result) => {
            callback(error, result);
        });
    },

    deleteCategoria: (id, callback) => {
        const query = 'DELETE FROM categorias WHERE id_categoria = ?';
        pool.query(query, [id], (error, result) => {
            callback(error, result);
        });
    }
};

module.exports = categoriaModel;
