// models/clienteModel.js usando callbacks
const pool = require('../config/db');

const clienteModel = {
    createCliente: (clienteData, callback) => {
        const { codigo_cliente, nit, nombre, direccion, tipo_pago, dias_pago } = clienteData;
        const query = `INSERT INTO Cliente (codigo_cliente, nit, nombre, direccion, tipo_pago, dias_pago) 
                       VALUES (?, ?, ?, ?, ?, ?)`;
        pool.query(query, [codigo_cliente, nit, nombre, direccion, tipo_pago, dias_pago], (error, result) => {
            callback(error, result);
        });
    },

    getClientes: (callback) => {
        const query = `SELECT * FROM Cliente`;
        pool.query(query, (error, results) => {
            callback(error, results);
        });
    },

    getClienteById: (codigo_cliente, callback) => {
        const query = `SELECT * FROM Cliente WHERE codigo_cliente = ?`;
        pool.query(query, [codigo_cliente], (error, results) => {
            callback(error, results[0]);
        });
    },

    updateCliente: (codigo_cliente, clienteData, callback) => {
        const { nit, nombre, direccion, tipo_pago, dias_pago } = clienteData;
        const query = `UPDATE Cliente SET nit = ?, nombre = ?, direccion = ?, tipo_pago = ?, dias_pago = ? 
                       WHERE codigo_cliente = ?`;
        pool.query(query, [nit, nombre, direccion, tipo_pago, dias_pago, codigo_cliente], (error, result) => {
            callback(error, result);
        });
    },

    deleteCliente: (codigo_cliente, callback) => {
        const query = `DELETE FROM Cliente WHERE codigo_cliente = ?`;
        pool.query(query, [codigo_cliente], (error, result) => {
            callback(error, result);
        });
    }
};

module.exports = clienteModel;
