const express = require('express');
const router = express.Router();
const evaluationsController = require('../controllers/evaluations_controller');
const healthcheckController = require('../controllers/healthcheck_controller');

router.get('/healthcheck', healthcheckController.healthcheck);

router.get('/users/:user_id/evaluations/latest', evaluationsController.getLatestEvaluation);
router.post('/users/:user_id/evaluations', evaluationsController.evaluate);

module.exports = router;