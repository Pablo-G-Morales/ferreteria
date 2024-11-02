// models/reciboModel.js
const pool = require('../config/db'); 

const reciboModel = {
    getClientes: (callback) => {
        const query = 'SELECT DISTINCT nombre_cliente FROM cotizacion'; 
        pool.query(query, (error, results) => {
            if (error) {
                return callback(error, null); 
            }
            callback(null, results); 
        });
    },
};

module.exports = reciboModel;
