const express = require('express');
const router = express.Router();
const evaluationsController = require('../controllers/evaluations_controller');
const scoresController = require('../controllers/scores_controller');
const weightsController = require('../controllers/weights_controller');
const healthcheckController = require('../controllers/healthcheck_controller');

router.get('/healthcheck', healthcheckController.healthcheck);

router.post('/companies/:company_id/evaluations', evaluationsController.evaluateCompany);

router.put('/users/:user_id/scores/:company_id', scoresController.scoreCompany);
router.get('/users/:user_id/scores', scoresController.getScores)

router.put('/users/:user_id/weights', weightsController.configureWeights);
router.get('/users/:user_id/weights', weightsController.getWeights);

module.exports = router;