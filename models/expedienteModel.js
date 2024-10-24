const pool = require('../config/db');

const expedienteModel = {

    getAllExpediente: (callback) => {
        const query = 'SELECT id_expediente, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, dpi, nit, fecha_nacimiento, id_genero, telefono, celular, direccion, nombre_contacto, telefono_contacto, fecha_ingreso, fecha_egreso, id_cargo FROM expediente';
        pool.query(query, (error, results) => {
            callback(error, results);
        });
    },

    // Obtener ordenes con paginación
    getPaginatedExpediente: (limit, offset, callback) => {
        const query = `SELECT expediente.*, 
                          genero.nombre AS genero,
                          cargo_empleado.nombre AS cargo_empleado
                       FROM expediente
                       LEFT JOIN genero ON expediente.id_genero = genero.id_genero
                       LEFT JOIN cargo_empleado ON expediente.id_cargo = cargo_empleado.id_cargo 
                       LIMIT ? OFFSET ?`;
        pool.query(query, [limit, offset], (error, results) => {
            callback(error, results);
        });
    },

    // Contar el total de ordenes
    countExpediente: (callback) => {
        const query = 'SELECT COUNT(*) AS total FROM expediente';
        pool.query(query, (error, result) => {
            if (error) return callback(error);
            callback(null, result[0].total);
        });
    },

    // Crear una orden
    createExpediente: (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, dpi, nit, fecha_nacimiento, id_genero, telefono, celular, direccion, nombre_contacto, telefono_contacto, fecha_ingreso, fecha_egreso, id_cargo, callback) => {
        const query = `INSERT INTO expediente (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, dpi, nit, fecha_nacimiento, id_genero, telefono, celular, direccion, nombre_contacto, telefono_contacto, fecha_ingreso, fecha_egreso, id_cargo) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        pool.query(query, [primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, dpi, nit, fecha_nacimiento, id_genero, telefono, celular, direccion, nombre_contacto, telefono_contacto, fecha_ingreso, fecha_egreso, id_cargo], (error, result) => {
            callback(error, result);
        });
    },

    // Actualizar una orden
    updateExpediente: (id, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, dpi, nit, fecha_nacimiento, id_genero, telefono, celular, direccion, nombre_contacto, telefono_contacto, fecha_ingreso, fecha_egreso, id_cargo, callback) => {
        const query = `UPDATE expediente 
        SET primer_nombre = ?, segundo_nombre = ?, primer_apellido = ?, segundo_apellido = ?, dpi = ?, nit = ?, 
            fecha_nacimiento = ?, id_genero = ?, telefono = ?, celular = ?, direccion = ?, 
            nombre_contacto = ?, telefono_contacto = ?, fecha_ingreso = ?, fecha_egreso = ?, id_cargo = ?
        WHERE id_expediente = ?`;
        pool.query(query, [primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, dpi, nit, fecha_nacimiento, id_genero, telefono, celular, direccion, nombre_contacto, telefono_contacto, fecha_ingreso, fecha_egreso, id_cargo, id], (error, result) => {
            callback(error, result);
        });
    },

    // Eliminar una orden
    deleteExpediente: (id, callback) => {
        const query = 'DELETE FROM expediente WHERE id_expediente = ?';
        pool.query(query, [id], (error, result) => {
            callback(error, result);
        });
    }
};

module.exports = expedienteModel;
