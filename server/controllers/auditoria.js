let queries = require('../bd/conexion');

const getAllAuditoria = (req, res) => {

    queries.query('SELECT * FROM auditoria', (error, result) => {
        if (error) {
            res.send(error);
        } 
        res.send(result);
    });

}

const getByIdAuditoria = (req, res) => {
    let id = req.params.id;
    queries.query('SELECT * FROM auditoria WHERE id = ?', id, (error, result) => {
        if (error) throw error;
 
        res.send(result);
    });

}




module.exports = {
    getAllAuditoria,
    getByIdAuditoria
}