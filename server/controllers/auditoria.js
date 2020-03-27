let queries = require('../bd/conexion');
let networkEnroll = require('../network/enrollAdmin');
let networkRegisterUser = require('../network/registerUser');
let networkInvoke = require('../network/invoke');
let networkQuery = require('../network/query');

// ----------- BLOCKCHAIN --------------------- //

const inscribirUsuario = (req,res) => {
    let usuario = req.params.user;
    networkRegisterUser.registerUser(usuario,res);

}

const inscribirAdmin = (req, res) => {
    networkEnroll.enrollAdmin(res);
}

const saveRegistroHLedger = (req, res) => {
    let auditoria = req.body;
    let user = req.params.user;

    networkInvoke.createAuditoria(auditoria, user.toString(), res);

}

const queryAuditoria = (req, res) => {
    let user = req.params.user;
    let idAuditoria = req.params.id;

    networkQuery.queryAuditoria(idAuditoria.toString(), user.toString(), res); 
}

const queryAllAuditorias = (req, res) => {

    let user = req.params.user;
    
    networkQuery.queryAllAuditorias(user.toString(), res);

}

// ----------- FIN BLOCKCHAIN --------------------- //


const getAllAuditoria = (req, res) => {

    queries.query('SELECT * FROM auditoria', (error, result) => {
        if (error) {
            res.status(400).send(error);
        } 
        res.status(200).send(result);
    });

}

const getByIdAuditoria = (req, res) => {
    let id = req.params.id;
    queries.query('SELECT * FROM auditoria WHERE id = ?', id, (error, result) => {
        if (error) res.status(400).send(error);
        res.status(200).send(result);
    });

}




module.exports = {
    getAllAuditoria,
    getByIdAuditoria,
    inscribirAdmin,
    inscribirUsuario,
    queryAuditoria,
    queryAllAuditorias,
    saveRegistroHLedger
}