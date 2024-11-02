const pool = require('../config/db');

const tipopagoModel = {
    getAllTipopago: (callback) => {
        const query = 'SELECT id_tipopago, nombre FROM tipo_pago';
        pool.query(query, (error, results) => {
            callback(error, results);
        });
    },

    getPaginatedTipopago: (limit, offset, callback) => {
        const query = 'SELECT * FROM tipo_pago LIMIT ? OFFSET ?';
        pool.query(query, [limit, offset], (error, results) => {
            callback(error, results);
        });
    },

    countTipopago: (callback) => {
        const query = 'SELECT COUNT(*) AS total FROM tipo_pago';
        pool.query(query, (error, result) => {
            if (error) return callback(error);
            callback(null, result[0].total);
        });
    },

    createTipopago: (nombre, callback) => {
        const query = 'INSERT INTO tipo_pago (nombre) VALUES (?)';
        pool.query(query, [nombre], (error, result) => {
            callback(error, result);
        });
    },

    updateTipopago: (id, nombre, callback) => {
        const query = 'UPDATE tipo_pago SET nombre = ? WHERE id_tipopago = ?';
        pool.query(query, [nombre, id], (error, result) => {
            callback(error, result);
        });
    },

    deleteTipopago: (id, callback) => {
        const query = 'DELETE FROM tipo_pago WHERE id_tipopago = ?';
        pool.query(query, [id], (error, result) => {
            callback(error, result);
        });
    }
};

module.exports = tipopagoModel;
