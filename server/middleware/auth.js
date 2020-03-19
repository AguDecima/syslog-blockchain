let jwt = require('jsonwebtoken');

// =====================
//  VERIFICAR TOKEN
// =====================

const verificaToken = (req, res, next) => {
    
    let token = req.get('token');

    jwt.verify(token, process.env.API_PRIVATE_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                mensaje: 'token no valido',
                status: false
            });
        }
        req.usuario = decoded;
        next();
    });
}

// ======================
//  VERIFICAR ROLE ADMIN
// ======================

let verificaRoleAdmin = (req, res, next) => {
    let usuario = req.usuario;

    if (parseInt(usuario.roles[0].id_rol) === 2) {
        next();
    }else{
        return res.json({
            state: false,
            error: {
                mensaje: 'el usuario no posee el permiso para acceder a este recurso'
            }
        })
    }
    
}

module.exports = {
    verificaToken,
    verificaRoleAdmin
}