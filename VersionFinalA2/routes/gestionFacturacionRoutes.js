const express = require('express');
const router = express.Router();
const gestionFacturacionModel = require('../models/gestionFacturacionModel');

// Ruta para obtener todos los proveedores
router.get('/api/proveedores', (req, res) => {
    gestionFacturacionModel.getAllProveedores((error, results) => {
        if (error) {
            console.error('Error al obtener proveedores:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener proveedores' });
        }
        res.json(results);
    });
});

// Ruta para obtener todos los productos
router.get('/api/productos', (req, res) => {
    gestionFacturacionModel.getAllProductos((error, results) => {
        if (error) {
            console.error('Error al obtener productos:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener productos' });
        }
        res.json(results);
    });
});

// Ruta para obtener todos los empleados
router.get('/api/empleados', (req, res) => {
    gestionFacturacionModel.getAllEmpleados((error, results) => {
        if (error) {
            console.error('Error al obtener empleados:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener empleados' });
        }
        res.json(results);
    });
});

// Ruta para guardar una nueva orden
router.post('/api/ordenes', (req, res) => {
    const orden = req.body;

    // Guardar la orden
    gestionFacturacionModel.saveOrder(orden, (error, orderId) => {
        if (error) {
            console.error('Error al guardar la orden:', error);
            return res.status(500).json({ success: false, message: 'Error al guardar la orden' });
        }

        // Guardar los detalles de la orden
        const detalles = orden.productos.map(product => ({
            id_orden: orderId,
            id_producto: product.productId,
            cantidad: product.cantidad,
            precio_unitario: product.precio,
            subtotal: product.subtotal
        }));

        // Guardar cada detalle
        const saveDetailsPromises = detalles.map(detail => {
            return new Promise((resolve, reject) => {
                gestionFacturacionModel.saveOrderDetails(detail, (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            });
        });

        Promise.all(saveDetailsPromises)
            .then(() => {
                res.status(201).json({ success: true, id: orderId });
            })
            .catch(err => {
                console.error('Error al guardar los detalles de la orden:', err);
                res.status(500).json({ success: false, message: 'Error al guardar los detalles de la orden' });
            });
    });
});

// Ruta para obtener todas las órdenes
router.get('/api/ordenes', (req, res) => {
    gestionFacturacionModel.getAllOrdenes((error, results) => {
        if (error) {
            console.error('Error al obtener órdenes:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener órdenes' });
        }
        res.json(results);
    });
});

// **Aquí está la ruta que utiliza la función getAllOrderDetails**
// Ruta para obtener los detalles de todas las órdenes
router.get('/api/detalles_ordenes', (req, res) => {
    gestionFacturacionModel.getAllOrderDetails((error, results) => {
        if (error) {
            console.error('Error al obtener detalles de las órdenes:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener detalles de las órdenes' });
        }
        res.json(results);
    });
});

// Ruta para eliminar una orden y sus detalles
router.delete('/api/ordenes/:id', (req, res) => {
    const orderId = req.params.id;
    gestionFacturacionModel.deleteOrder(orderId, (error) => {
        if (error) {
            console.error('Error al eliminar la orden:', error);
            return res.status(500).json({ success: false, message: 'Error al eliminar la orden' });
        }
        res.json({ success: true, message: 'Orden eliminada exitosamente' });
    });
});

module.exports = router;
