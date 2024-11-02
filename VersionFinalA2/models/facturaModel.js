// models/facturaModel.js
const pool = require('../config/db');

const facturaModel = {
    guardarFactura: (data, callback) => {
        const { numero_factura, nombre_cliente, productos } = data;

        const queryFactura = `INSERT INTO facturas (numero_factura, nombre_cliente) VALUES (?, ?)`;

        pool.query(queryFactura, [numero_factura, nombre_cliente], (error, result) => {
            if (error) {
                console.error('Error al insertar en facturas:', error);
                return callback(error, null);
            }

            const facturaId = result.insertId;
            const queryProducto = `INSERT INTO factura_productos (factura_id, codigo_producto, nombre_producto, cantidad, precio_unitario, total) 
                                   VALUES (?, ?, ?, ?, ?, ?)`;
            
            const productosQueries = productos.map(producto => {
                return new Promise((resolve, reject) => {
                    pool.query(queryProducto, [facturaId, producto.codigo, producto.nombre, producto.cantidad, producto.precio_unitario, producto.total], (error) => {
                        if (error) {
                            console.error('Error al insertar producto de factura:', error);
                            reject(error);
                        } else {
                            // Actualizar el stock del producto
                            const queryActualizarStock = `UPDATE productos SET stock_minimo = stock_minimo - ? WHERE nombre = ?`;
                            pool.query(queryActualizarStock, [producto.cantidad, producto.nombre], (error) => {
                                if (error) {
                                    console.error('Error al actualizar stock del producto:', error);
                                    reject(error);
                                } else {
                                    resolve();
                                }
                            });
                        }
                    });
                });
            });

            Promise.all(productosQueries)
                .then(() => callback(null, { success: true }))
                .catch(err => callback(err, null));
        });
    }
};

module.exports = facturaModel;