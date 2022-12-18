const userScores = require('../services/user_scores_service');

const scoreCompany = async function (req, res) {
  const desiredUserId = req.params.user_id;
  const actualUserId = req.headers['x-user-id'];
  if (actualUserId !== desiredUserId){
    res.status(403).send(`Cannot score company for user: ${desiredUserId}`);
    return;
  }

  const score = req.body.score;
  const companyId = req.params.company_id;

  try {
    await userScores.setForUserIdAndCompanyId(actualUserId, companyId, score);
  } catch (error) {
    console.error(error);
    res.status(400).send(`Error scoring company with id ${companyId}!`);
  } 
  
  res.status(200).send();
}

const getScores = async function (req, res) {
  const desiredUserId = req.params.user_id;
  const actualUserId = req.headers['x-user-id'];
  if (actualUserId !== desiredUserId){
    res.status(403).send(`Cannot score company for user: ${desiredUserId}`);
    return;
  }

  let result;
  try {
    result = await userScores.getByUserId(actualUserId);
  } catch (error) {
    console.error(error);
    res.status(400).send(`Error getting scores for user id ${actualUserId}!`);
  } 
  
  res.status(200).send(result);
}

module.exports = {
  getScores,
  scoreCompany  
};