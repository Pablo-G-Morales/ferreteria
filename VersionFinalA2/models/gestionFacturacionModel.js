const pool = require('../config/db');

const gestionFacturacionModel = {
    // Función para obtener todos los proveedores
    getAllProveedores: (callback) => {
        const query = 'SELECT id_proveedor, nombre FROM proveedores';
        pool.query(query, (error, results) => {
            callback(error, results);
        });
    },

    // Función para obtener todos los productos
    getAllProductos: (callback) => {
        const query = 'SELECT id_producto, nombre, precio FROM productos';
        pool.query(query, (error, results) => {
            callback(error, results);
        });
    },

    // Función para obtener todos los empleados
    getAllEmpleados: (callback) => {
        const query = `
            SELECT id_expediente, 
                   CONCAT(primer_nombre, ' ', segundo_nombre, ' ', primer_apellido, ' ', segundo_apellido) AS nombre_completo, 
                   nit 
            FROM expediente`;
        pool.query(query, (error, results) => {
            callback(error, results);
        });
    },

    // Función para guardar una nueva orden
    saveOrder: (orden, callback) => {
        const query = `
            INSERT INTO ordenes (id_proveedor, id_empleado, nit, responsable, fecha, direccion, total)
            VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const values = [orden.id_proveedor, orden.id_empleado, orden.nit, orden.responsable, orden.fecha, orden.direccion, orden.total];
        
        pool.query(query, values, (error, results) => {
            if (error) {
                return callback(error, null);
            }
            const orderId = results.insertId; // Obtener el ID de la orden recién insertada
            callback(null, orderId);
        });
    },

    // Función para guardar los detalles de una orden
    saveOrderDetails: (details, callback) => {
        const query = `
            INSERT INTO detalles_orden (id_orden, id_producto, cantidad, precio_unitario, subtotal)
            VALUES (?, ?, ?, ?, ?)`;
        
        const values = [details.id_orden, details.id_producto, details.cantidad, details.precio_unitario, details.subtotal];
        
        pool.query(query, values, (error, results) => {
            callback(error, results);
        });
    },

    // Función para obtener todas las órdenes
    getAllOrdenes: (callback) => {
        const query = 'SELECT * FROM ordenes';
        pool.query(query, (error, results) => {
            callback(error, results);
        });
    },

    // Función para obtener todos los detalles de las órdenes
    getAllOrderDetails: (callback) => {
        const query = `
            SELECT detalles_orden.id_detalle, detalles_orden.id_orden, productos.nombre AS producto, detalles_orden.cantidad, detalles_orden.subtotal
            FROM detalles_orden
            JOIN productos ON detalles_orden.id_producto = productos.id_producto`;
        pool.query(query, (error, results) => {
            callback(error, results);
        });
    },

    // Función para eliminar una orden y sus detalles
    deleteOrder: (orderId, callback) => {
        // Primero, eliminar los detalles de la orden
        const deleteDetailsQuery = 'DELETE FROM detalles_orden WHERE id_orden = ?';
        pool.query(deleteDetailsQuery, [orderId], (error) => {
            if (error) {
                return callback(error);
            }
            // Luego, eliminar la orden
            const deleteOrderQuery = 'DELETE FROM ordenes WHERE id = ?';
            pool.query(deleteOrderQuery, [orderId], (error) => {
                callback(error);
            });
        });
    }
};

module.exports = gestionFacturacionModel;
