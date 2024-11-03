const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const productoModel = require('../models/productoModel');

// Configuración de Multer para el almacenamiento de imágenes en el sistema de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads'); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname); // Generar un nombre único para el archivo
        cb(null, uniqueName);
    }
});

const upload = multer({ storage: storage });

// Ruta para obtener todos los productos con paginación
router.get('/productos', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || ''; // Capturar parámetro de búsqueda

    productoModel.getPaginatedProductos(limit, offset, search, (error, results) => {
        if (error) {
            console.error('Error al obtener productos:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener productos' });
        }

        // Construir la URL de la imagen para cada producto
        results.forEach(producto => {
            if (producto.imagen) {
                producto.imagen = `/uploads/${producto.imagen}`;
            }
        });

        productoModel.countProductos(search, (err, total) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al contar productos' });
            }
            const totalPages = Math.ceil(total / limit);
            res.json({ data: results, totalPages, currentPage: page });
        });
    });
});

// Ruta para crear un nuevo producto
router.post('/productos', upload.single('imagen'), (req, res) => {
    const { nombre, descripcion, precio, stock_minimo, id_proveedor, id_categoria, id_unidad_medida, id_color, id_marca } = req.body;
    const imagen = req.file ? req.file.filename : null; // Guardar el nombre del archivo o null si no hay imagen

    productoModel.createProducto(
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
        (error, result) => {
            if (error) {
                console.error('Error al crear el producto:', error);
                return res.status(500).json({ success: false, message: 'Error al crear el producto' });
            }
            res.json({ success: true, message: 'Producto creado correctamente', data: result });
        }
    );
});

// Ruta para actualizar un producto existente
router.put('/productos/:id', upload.single('imagen'), (req, res) => {
    const { id } = req.params;
    const {
        nombre,
        descripcion,
        precio,
        stock_minimo,
        id_proveedor,
        id_categoria,
        id_unidad_medida,
        id_color,
        id_marca
    } = req.body;

    const imagen = req.file ? req.file.filename : null; // Guardar el nombre del archivo si se ha subido una nueva imagen

    productoModel.updateProducto(
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
        (error, result) => {
            if (error) {
                console.error('Error al actualizar el producto:', error);
                return res.status(500).json({ success: false, message: 'Error al actualizar el producto' });
            }
            res.json({ success: true, message: 'Producto actualizado correctamente', data: result });
        }
    );
});

// Ruta para eliminar un producto
router.delete('/productos/:id', (req, res) => {
    const { id } = req.params;

    productoModel.deleteProducto(id, (error, result) => {
        if (error) {
            console.error('Error al eliminar el producto:', error);
            return res.status(500).json({ success: false, message: 'Error al eliminar el producto' });
        }
        res.json({ success: true, message: 'Producto eliminado correctamente', data: result });
    });
});

module.exports = router;
