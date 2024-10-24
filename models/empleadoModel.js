const pool = require('../config/db');

const empleadoModel = {
    // Obtener todos los empleados
    getAllEmpleado: (callback) => {
        const query = 'SELECT id_empleado, nombre, dpi, nit, telefono, direccion, cargo, salario FROM empleado';
        pool.query(query, (error, results) => {
            callback(error, results);
        });
    },

    // Obtener empleados con paginación
    getPaginatedEmpleado: (limit, offset, callback) => {
        const query = 'SELECT * FROM empleado LIMIT ? OFFSET ?';
        pool.query(query, [limit, offset], (error, results) => {
            callback(error, results);
        });
    },

    // Contar el total de empleados
    countEmpleado: (callback) => {
        const query = 'SELECT COUNT(*) AS total FROM empleado';
        pool.query(query, (error, result) => {
            if (error) {
                console.error('Error al contar empleados:', error);
                return callback(error);
            }
            callback(null, result[0].total);
        });
    },

    // Crear un nuevo empleado
    createEmpleado: (nombre, dpi, nit, telefono, direccion, cargo, salario, callback) => {
        const query = `INSERT INTO empleado (nombre, dpi, nit, telefono, direccion, cargo, salario) 
                       VALUES (?, ?, ?, ?, ?, ?, ?)`;
        pool.query(query, [nombre, dpi, nit, telefono, direccion, cargo, salario], (error, result) => {
            if (error) {
                console.error('Error al crear el nuevo empleado:', error);
                return callback(error);
            }
            callback(null, result);
        });
    },

    // Actualizar un empleado existente
    updateEmpleado: (id, nombre, dpi, nit, telefono, direccion, cargo, salario, callback) => {
        const query = `UPDATE empleado 
                       SET nombre = ?, dpi = ?, nit = ?, telefono = ?, direccion = ?, cargo = ?, salario = ?
                       WHERE id_empleado = ?`; // Eliminar la coma aquí
        pool.query(query, [nombre, dpi, nit, telefono, direccion, cargo, salario, id], (error, result) => {
            if (error) {
                console.error('Error al actualizar el empleado:', error);
                return callback(error);
            }
            callback(null, result);
        });
    },

    // Eliminar un empleado
    deleteEmpleado: (id, callback) => {
        const query = 'DELETE FROM empleado WHERE id_empleado = ?';
        pool.query(query, [id], (error, result) => {
            if (error) {
                console.error('Error al eliminar el empleado:', error);
                return callback(error);
            }
            callback(null, result);
        });
    }
};

module.exports = empleadoModel;