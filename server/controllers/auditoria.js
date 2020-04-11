let queries = require('../bd/conexion');
let networkEnroll = require('../network/enrollAdmin');
let networkRegisterUser = require('../network/registerUser');
let networkInvoke = require('../network/invoke');
let networkQuery = require('../network/query');
const bcrypt = require('bcrypt');   
const saltRounds = 10;

// ----------- BLOCKCHAIN --------------------- //

const inscribirUsuario = (req, res) => {
    let usuario = req.params.user;
    networkRegisterUser.registerUser(usuario.toString(), res);

}

const inscribirAdmin = (req, res) => {
    networkEnroll.enrollAdmin(res);
}

const saveRegistroHLedger = (req, res) => {

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

const isCorrupted = (req, res) => {

    let id = req.params.id;
    let hash = req.body.hash;
    
    queries.query('SELECT * FROM auditoria WHERE id = ?', id, (error, result) => {
        if (error) res.status(400).send(error);
        let fecha = new Date(result[0].datetime);

        let auditoriaHP = {
        id:         (result[0].id).toString(),
        seqblock:   (result[0].secuencia).toString(),
        orblock:    (result[0].organizacion).toString(),
        ipblock:    (result[0].ip).toString(),
        tsblock:    `${fecha}`,
        crblock:    (result[0].level).toString(),
        fablock:    (result[0].facility).toString(),
        prblock:    (result[0].prioridad).toString(),
        deblock:    (result[0].mensaje).toString(),
        tablock:    (result[0].tag).toString()
        }

        console.log(auditoriaHP)

        bcrypt.compare(JSON.stringify(auditoriaHP), hash).then(function(result) {
            // result == true
            res.send({
                id,
                hash,
                result
            })
        });

    });

}

const login = (req, res) => {
    let user = req.params.user;
    networkQuery.isExistUser(user,res);
}

module.exports = {
    getAllAuditoria,
    getByIdAuditoria,
    inscribirAdmin,
    inscribirUsuario,
    queryAuditoria,
    queryAllAuditorias,
    saveRegistroHLedger,
    isCorrupted,
    login
}