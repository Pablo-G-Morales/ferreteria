const pool = require('../config/db');

const productoModel = {

    getAllProducto: (callback) => {
        const query = 'SELECT id_producto, nombre, descripcion, precio, stock_minimo, id_proveedor, id_categoria, id_unidad_medida, id_color, id_marca, imagen FROM productos';
        pool.query(query, (error, results) => {
            callback(error, results);
        });
    },
  
  // Obtener productos con paginación y búsqueda
  getPaginatedProductos: (limit, offset, search, callback) => {
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
                   WHERE productos.nombre LIKE ? 
                   LIMIT ? OFFSET ?`;

    pool.query(query, [`%${search}%`, limit, offset], (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    });
  },

  // Contar el total de productos filtrados por búsqueda
  countProductos: (search, callback) => {
    const query = 'SELECT COUNT(*) AS total FROM productos WHERE nombre LIKE ?';
    pool.query(query, [`%${search}%`], (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result[0].total);
      }
    });
  },

  // Crear un nuevo producto
  createProducto: (
    nombre,
    descripcion,
    precio,
    stock_minimo,
    id_proveedor,
    id_categoria,
    id_unidad_medida,
    id_color,
    id_marca,
    imagen,
    callback
  ) => {
    const query = `INSERT INTO productos (nombre, descripcion, precio, stock_minimo, id_proveedor, id_categoria, id_unidad_medida, id_color, id_marca, imagen) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    pool.query(
      query,
      [nombre, descripcion, precio, stock_minimo, id_proveedor, id_categoria, id_unidad_medida, id_color, id_marca, imagen],
      (error, result) => {
        callback(error, result);
      }
    );
  },

  // Actualizar un producto existente
  updateProducto: (
    id,
    nombre,
    descripcion,
    precio,
    stock_minimo,
    id_proveedor,
    id_categoria,
    id_unidad_medida,
    id_color,
    id_marca,
    imagen,
    callback
  ) => {
    let query = `UPDATE productos 
                 SET nombre = ?, descripcion = ?, precio = ?, stock_minimo = ?, id_proveedor = ?, id_categoria = ?, id_unidad_medida = ?, id_color = ?, id_marca = ?`;
    
    const params = [nombre, descripcion, precio, stock_minimo, id_proveedor, id_categoria, id_unidad_medida, id_color, id_marca];
    
    // Solo actualizamos la imagen si se ha proporcionado una nueva
    if (imagen) {
      query += `, imagen = ?`;
      params.push(imagen);
    }
    
    query += ` WHERE id_producto = ?`;
    params.push(id);

    pool.query(query, params, (error, result) => {
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
