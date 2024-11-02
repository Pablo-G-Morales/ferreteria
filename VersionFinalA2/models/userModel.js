const connection = require('../config/db');

const getAllUsers = (callback) => {
    const query = `
        SELECT u.id, u.nombre, u.apellido, u.telefono, u.correo, u.username, e.nombre as estado_nombre, r.nombre as rol_nombre
        FROM usuarios u
        LEFT JOIN estado e ON u.estado_id = e.id
        LEFT JOIN rol r ON u.rol_id = r.id
    `;
    connection.query(query, callback);
};

module.exports = {
    getAllUsers
};
