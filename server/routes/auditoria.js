var express = require('express');
var router = express.Router();
const { verificaToken } = require('../middleware/auth');

let AuditoriaController = require('../controllers/auditoria');

// HYPER LEDGER
router.get('/enroll-user/:user', AuditoriaController.inscribirUsuario);
router.get('/enroll-admin', AuditoriaController.inscribirAdmin);
router.get('/query-auditoria/:user&:id', AuditoriaController.queryAuditoria);
router.get('/query-auditorias/:user', AuditoriaController.queryAllAuditorias);
router.post('/invoke-create/:user', AuditoriaController.saveRegistroHLedger);
router.post('/verificar-datos/:id', AuditoriaController.isCorrupted);


router.get('/auditorias', AuditoriaController.getAllAuditoria);
router.get('/auditorias/:id', AuditoriaController.getByIdAuditoria);

module.exports = router;