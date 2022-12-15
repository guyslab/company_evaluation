const companyEvaluations = require('../services/company_evaluation_service');
const userScores = require('../services/user_scores_service');

const evaluateCompany = async function (req, res) {
  const companyId = req.query.company_id;
  const userId = req.headers['x-user-id'];
  let result;
  try {
    result = await companyEvaluations.evaluateCompany(userId, companyId);
  } catch (error) {
    console.error(error);
    res.status(400).send(`Error evaluating company with id ${companyId.id}!`);
  }  
  
  return result;
}

const scoreCompany = async function (res, res) {
  const desiredUserId = req.body.user_id;
  const actualUserId = req.headers['x-user-id'];
  if (actualUserId !== desiredUserId){
    res.status(403).send(`Cannot score company for user: ${desiredUserId}`);
    return;
  }

  const score = req.body.score;
  const companyId = req.query.company_id;

  try {
    await userScores.setForUserIdAndCompanyId(actualUserId, companyId, score);
  } catch (error) {
    console.error(error);
    res.status(400).send(`Error scoring company with id ${companyId.id}!`);
  }     
}

module.exports = {
  init,
  getById,
  create
};