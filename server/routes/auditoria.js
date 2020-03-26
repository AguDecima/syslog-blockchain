var express = require('express');
var router = express.Router();
const { verificaToken } = require('../middleware/auth');

let AuditoriaController = require('../controllers/auditoria');

router.get('/enroll-admin', AuditoriaController.inscribirAdmin);
router.get('/auditorias', AuditoriaController.getAllAuditoria);
router.get('/auditorias/:id', AuditoriaController.getByIdAuditoria);

module.exports = router;