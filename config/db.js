const mysql = require('mysql2');

// Crear un pool de conexiones
const pool = mysql.createPool({
    connectionLimit: 10,    // Ajusta este valor según tus necesidades
    host: 'localhost',
    user: 'root',
    password: '',           // Ajusta con tu contraseña de MySQL
    database: 'BD_LOGIN'    // Ajusta con el nombre de tu base de datos
});

module.exports = pool;