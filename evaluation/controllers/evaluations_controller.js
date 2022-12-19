const evaluationService = require('../services/evaluation_service');

const evaluate = function (req, res, next) {
  const desiredUserId = req.params.user_id;
  const actualUserId = req.headers['x-user-id'];
  if (actualUserId !== desiredUserId){
    res.status(403).end(`Cannot evaluate for user: ${desiredUserId}`);
    return;
  }
  res.status(202).json({status: "calculating", "location": `users/${actualUserId}/evaluations/latest`});
  next();
}

const getLatestEvaluation = async function (req, res) {
  const desiredUserId = req.params.user_id;
  const actualUserId = req.headers['x-user-id'];
  if (actualUserId !== desiredUserId){
    res.status(403).end(`Cannot get evaluations for user: ${desiredUserId}`);
    return;
  }

  let latest;
  try {
    latest = await evaluationService.getLatestEvaluation(actualUserId);
  } catch (error) {
    console.error(error);
    res.status(400).end(`Error evaluating for user id ${actualUserId}!`);
  }  
  
  res.status(200).json(latest);
}


module.exports = {
  evaluate,
  getLatestEvaluation
};