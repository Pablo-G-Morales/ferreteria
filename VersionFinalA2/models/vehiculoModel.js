const pool = require('../config/db');

const vehiculoModel = {
    // Obtener todos los vehiculos
    getAllVehiculo: (callback) => {
        const query = 'SELECT id_vehiculo, nombre, placa, id_tipovehiculo, id_marcavehiculo, color, propietario, precio FROM vehiculo';
        pool.query(query, (error, results) => {
            callback(error, results);
        });
    },

    // Obtener vehiculos con paginación
    getPaginatedVehiculo: (limit, offset, callback) => {
        const query = `SELECT vehiculo.*, 
                          tipo_vehiculo.nombre AS tipo_vehiculo,
                          marca_vehiculo.nombre AS marca_vehiculo
                       FROM vehiculo
                       LEFT JOIN tipo_vehiculo ON vehiculo.id_tipovehiculo = tipo_vehiculo.id_tipovehiculo
                       LEFT JOIN marca_vehiculo ON vehiculo.id_marcavehiculo = marca_vehiculo.id_marcavehiculo
                       LIMIT ? OFFSET ?`;
        pool.query(query, [limit, offset], (error, results) => {
            callback(error, results);
        });
    },

    // Contar el total de vehiculos
    countVehiculo: (callback) => {
        const query = 'SELECT COUNT(*) AS total FROM vehiculo';
        pool.query(query, (error, result) => {
            if (error) {
                console.error('Error al contar vehiculos:', error);
                return callback(error);
            }
            callback(null, result[0].total);
        });
    },

    // Crear un nuevo vehiculo
    createVehiculo: (nombre, placa, id_tipovehiculo, id_marcavehiculo, color, propietario, precio, callback) => {
        const query = `INSERT INTO vehiculo (nombre, placa, id_tipovehiculo, id_marcavehiculo, color, propietario, precio) 
                       VALUES (?, ?, ?, ?, ?, ?, ?)`;
        pool.query(query, [nombre, placa, id_tipovehiculo, id_marcavehiculo, color, propietario, precio], (error, result) => {
            if (error) {
                console.error('Error al crear el nuevo vehiculo:', error);
                return callback(error);
            }
            callback(null, result);
        });
    },

    // Actualizar un vehiculo existente
    updateVehiculo: (id, nombre, placa, id_tipovehiculo, id_marcavehiculo, color, propietario, precio, callback) => {
        const query = `UPDATE vehiculo 
                       SET nombre = ?, placa = ?, id_tipovehiculo = ?, id_marcavehiculo = ?, color = ?, propietario = ?, precio = ?
                       WHERE id_vehiculo = ?`; // Eliminar la coma aquí
        pool.query(query, [nombre, placa, id_tipovehiculo, id_marcavehiculo, color, propietario, precio, id], (error, result) => {
            if (error) {
                console.error('Error al actualizar el vehiculo:', error);
                return callback(error);
            }
            callback(null, result);
        });
    },

    // Eliminar un vehiculo
    deleteVehiculo: (id, callback) => {
        const query = 'DELETE FROM vehiculo WHERE id_vehiculo = ?';
        pool.query(query, [id], (error, result) => {
            if (error) {
                console.error('Error al eliminar el vehiculo:', error);
                return callback(error);
            }
            callback(null, result);
        });
    }
};

module.exports = vehiculoModel;
