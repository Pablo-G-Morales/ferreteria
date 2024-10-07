
const express = require('express');
const bodyParser = require('body-parser');
const inventoryRoutes = require('./routes/inventoryRoutes'); // Rutas de inventario
const authRoutes = require('./routes/authRoutes');           // Rutas de autenticación
const categoriasRoutes = require('./routes/categoriasRoutes');
const coloresRoutes = require('./routes/coloresRoutes');
const proveedoresRoutes = require('./routes/proveedoresRoutes');
const marcasRoutes = require('./routes/marcasRoutes');
const unidadesMedidaRoutes = require('./routes/unidadesMedidaRoutes');
const productosRoutes = require('./routes/productosRoutes');
const comprasRoutes = require('./routes/comprasRoutes');
const vehiculoRoutes = require('./routes/vehiculoRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use(categoriasRoutes);
app.use(inventoryRoutes);
app.use(authRoutes);
app.use(coloresRoutes);
app.use(proveedoresRoutes);
app.use(marcasRoutes);
app.use(unidadesMedidaRoutes);
app.use(productosRoutes);
app.use(comprasRoutes);
app.use(vehiculoRoutes);

// Archivos estáticos (HTML, CSS, etc.)
app.use(express.static('public'));


// Puerto de escucha
 

    app.listen(5000, () => {
        console.log('Servidor corriendo en http://localhost:5000');
    });