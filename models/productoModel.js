const pool = require('../config/db');

const productoModel = {
    // Obtener productos con paginación
    getPaginatedProductos: (limit, offset, callback) => {
        const query = `SELECT productos.*, 
                          proveedores.nombre AS proveedor, 
                          categorias.nombre AS categoria, 
                          unidadesmedida.nombre AS unidad_medida, 
                          colores.nombre AS color, 
                          marcas.nombre AS marca 
                       FROM productos 
                       LEFT JOIN proveedores ON productos.id_proveedor = proveedores.id_proveedor 
                       LEFT JOIN categorias ON productos.id_categoria = categorias.id_categoria 
                       LEFT JOIN unidadesmedida ON productos.id_unidad_medida = unidadesmedida.id_unidad 
                       LEFT JOIN colores ON productos.id_color = colores.id_color 
                       LEFT JOIN marcas ON productos.id_marca = marcas.id_marca 
                       LIMIT ? OFFSET ?`;
        pool.query(query, [limit, offset], (error, results) => {
            callback(error, results);
        });
    },

    // Contar el total de productos
    countProductos: (callback) => {
        const query = 'SELECT COUNT(*) AS total FROM productos';
        pool.query(query, (error, result) => {
            if (error) return callback(error);
            callback(null, result[0].total);
        });
    },

    // Crear un producto
    createProducto: (nombre, descripcion, precio, stock_minimo, id_proveedor, id_categoria, id_unidad_medida, id_color, id_marca, callback) => {
        const query = `INSERT INTO productos (nombre, descripcion, precio, stock_minimo, id_proveedor, id_categoria, id_unidad_medida, id_color, id_marca) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        pool.query(query, [nombre, descripcion, precio, stock_minimo, id_proveedor, id_categoria, id_unidad_medida, id_color, id_marca], (error, result) => {
            callback(error, result);
        });
    },

    // Actualizar un producto
    updateProducto: (id, nombre, descripcion, precio, stock_minimo, id_proveedor, id_categoria, id_unidad_medida, id_color, id_marca, callback) => {
        const query = `UPDATE productos 
                       SET nombre = ?, descripcion = ?, precio = ?, stock_minimo = ?, id_proveedor = ?, id_categoria = ?, id_unidad_medida = ?, id_color = ?, id_marca = ? 
                       WHERE id_producto = ?`;
        pool.query(query, [nombre, descripcion, precio, stock_minimo, id_proveedor, id_categoria, id_unidad_medida, id_color, id_marca, id], (error, result) => {
            callback(error, result);
        });
    },

    // Eliminar un producto
    deleteProducto: (id, callback) => {
        const query = 'DELETE FROM productos WHERE id_producto = ?';
        pool.query(query, [id], (error, result) => {
            callback(error, result);
        });
    }
};

module.exports = productoModel;
