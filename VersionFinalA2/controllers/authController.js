const crypto = require('crypto');
const connection = require('../config/db');

const login = (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

    const query = 'SELECT * FROM usuarios WHERE username = ? AND password = ?';
    connection.query(query, [username, hashedPassword], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            const user = results[0];
            if (user.estado_id === 2) {
                res.json({ success: false, message: 'Usuario bloqueado. Contacta al administrador.' });
            } else {
                const rol = user.rol_id === 1 ? 'admin' : 'usuario';
                res.json({ success: true, rol: rol, message: `Redirigir a ${rol === 'admin' ? 'gestion.html' : 'dashboard.html'}` });
            }
        } else {
            res.json({ success: false, message: 'Usuario o contraseña incorrectos' });
        }
    });
};

module.exports = {
    login
};
