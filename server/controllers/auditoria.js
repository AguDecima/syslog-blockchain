let queries = require('../bd/conexion');
let networkEnroll = require('../network/enrollAdmin');

const inscribirAdmin = (req, res) => {
    networkEnroll.enrollAdmin(res);
}

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
    inscribirAdmin
}