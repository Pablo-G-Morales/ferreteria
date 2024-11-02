const pool = require('../config/db');

const cargoempleadoModel = {
    getAllCargo: (callback) => {
        const query = 'SELECT id_cargo, nombre, descripcion, salario FROM cargo_empleado';
        pool.query(query, (error, results) => {
            callback(error, results);
        });
    },

    getPaginatedCargo: (limit, offset, callback) => {
        const query = 'SELECT * FROM cargo_empleado LIMIT ? OFFSET ?';
        pool.query(query, [limit, offset], (error, results) => {
            callback(error, results);
        });
    },

    countCargo: (callback) => {
        const query = 'SELECT COUNT(*) AS total FROM cargo_empleado';
        pool.query(query, (error, result) => {
            if (error) return callback(error);
            callback(null, result[0].total);
        });
    },

    createCargo: (nombre, descripcion, salario, callback) => {
        const query = 'INSERT INTO cargo_empleado (nombre, descripcion, salario) VALUES (?, ?, ?)';
        pool.query(query, [nombre, descripcion, salario], (error, result) => {
            callback(error, result);
        });
    },

    updateCargo: (id, nombre, descripcion, salario, callback) => {
        const query = 'UPDATE cargo_empleado SET nombre = ?, descripcion = ?, salario = ? WHERE id_cargo = ?';
        pool.query(query, [nombre, descripcion, salario, id], (error, result) => {
            callback(error, result);
        });
    },

    deleteCargo: (id, callback) => {
        const query = 'DELETE FROM cargo_empleado WHERE id_cargo = ?';
        pool.query(query, [id], (error, result) => {
            callback(error, result);
        });
    }
};

module.exports = cargoempleadoModel;