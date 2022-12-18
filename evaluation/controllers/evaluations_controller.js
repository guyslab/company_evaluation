const companyEvaluations = require('../services/ealuation_service');

const evaluateCompany = async function (req, res) {
  const companyId = req.params.company_id;
  const userId = req.headers['x-user-id'];
  let result;
  try {
    result = await companyEvaluations.evaluateCompany(userId, companyId);
  } catch (error) {
    console.error(error);
    res.status(400).send(`Error evaluating company with id ${companyId.id}!`);
  }  
  
  res.send({result});
}


module.exports = {
  evaluateCompany
};