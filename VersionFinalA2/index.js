
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
const envioRoutes = require('./routes/envioRoutes');
const facturaRoutes = require('./routes/facturaRoutes');

const vehiculoRoutes = require('./routes/vehiculoRoutes');
const empleadoRoutes = require('./routes/empleadoRoutes');
const estadocontrasenaRoutes = require('./routes/estado_contrasenaRoutes');
const tipopagoRoutes = require('./routes/tipopagoRoutes');
const orden_compraRoutes = require('./routes/orden_compraRoutes');
const detalleordenRoutes = require('./routes/detalleordenRoutes');
const contrasenaproveedorRoutes = require('./routes/contrasenaproveedorRoutes');
const tipovehiculoRoutes = require('./routes/tipovehiculoRoutes');
const marcavehiculoRoutes = require('./routes/marcavehiculoRoutes');
const generoRoutes = require('./routes/generoRoutes');
const cargoempleadoRoutes = require('./routes/cargoempleadoRoutes');
const expedienteRoutes = require('./routes/expedienteRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const cotizacionRoutes = require('./routes/cotizacionRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const gestionFacturacionRoutes = require('./routes/gestionFacturacionRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use(categoriasRoutes);
app.use(inventoryRoutes);
app.use('/', envioRoutes);
app.use('/api/facturas', facturaRoutes);
app.use(authRoutes);
app.use(coloresRoutes);
app.use(proveedoresRoutes);
app.use(marcasRoutes);
app.use(unidadesMedidaRoutes);
app.use(productosRoutes);
app.use(comprasRoutes);
app.use(vehiculoRoutes);
app.use(empleadoRoutes);
app.use(estadocontrasenaRoutes);
app.use(tipopagoRoutes);
app.use(orden_compraRoutes);
app.use(detalleordenRoutes);
app.use (contrasenaproveedorRoutes);
app.use (tipovehiculoRoutes);
app.use (marcavehiculoRoutes);
app.use (generoRoutes);
app.use (cargoempleadoRoutes);
app.use (expedienteRoutes);
app.use( clienteRoutes);
app.use( cotizacionRoutes);
app.use(gestionFacturacionRoutes);
app.use(usuariosRoutes);

// Archivos estáticos (HTML, CSS, etc.)
app.use(express.static('public'));


// Puerto de escucha
 

    app.listen(5000, () => {
        console.log('Servidor corriendo en http://localhost:5000');
    });