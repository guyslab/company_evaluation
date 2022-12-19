const evaluationService = require('../services/evaluation_service');

const processEvaluation = function (req, res, next) {  
  const userId = req.headers['x-user-id'];
  console.debug('[DEBUG] processEvaluation: ', res.statusCode, userId, req.path);
  if (req.path === `/users/${userId}/evaluations` && res.statusCode === 202){
    try {
        evaluationService.evaluate(userId).then(() => res.end());
    } catch (error) {
        console.error(error);
    }
  }

  next();
}

module.exports = {
    processEvaluation
};