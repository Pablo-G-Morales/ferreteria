// models/envioModel.js
const pool = require('../config/db');

const envioModel = {
    guardarEnvio: (envioData, callback) => {
        const { nombre_cliente, direccion, fecha_envio, fecha_entrega, observaciones, productos } = envioData;

        // Insertar los datos del envío
        const queryEnvio = `INSERT INTO envios (nombre_cliente, direccion, fecha_envio, fecha_entrega, observaciones) 
                            VALUES (?, ?, ?, ?, ?)`;
        
        pool.query(queryEnvio, [nombre_cliente, direccion, fecha_envio, fecha_entrega, observaciones], (error, result) => {
            if (error) {
                console.error('Error al insertar envío:', error);
                return callback(error, null);
            }

            const envioId = result.insertId;

            // Insertar los productos relacionados con el envío en la tabla `envio_productos`
            const queryProducto = `INSERT INTO envio_productos (envio_id, codigo_producto, nombre_producto, categoria, marca, unidad_medida, cantidad, precio_unitario, total) 
                                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            
            // Promesas para cada producto
            const productosQueries = productos.map(producto => {
                return new Promise((resolve, reject) => {
                    pool.query(queryProducto, [envioId, producto.codigo, producto.nombre, producto.categoria, producto.marca, producto.unidad_medida, producto.cantidad, producto.precio_unitario, producto.total], (error) => {
                        if (error) {
                            console.error('Error al insertar producto:', error);
                            reject(error);
                        } else {
                            resolve();
                        }
                    });
                });
            });

            // Ejecutar todas las promesas
            Promise.all(productosQueries)
                .then(() => callback(null, { success: true }))
                .catch(err => callback(err, null));
        });
    }
};

module.exports = envioModel;
