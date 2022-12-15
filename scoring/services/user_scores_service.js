const repo = require('../respositories/user_scores_repository');

const setForUserIdAndCompanyId = async function (userId, companyId, score) {
    await repo.setForUserIdAndCompanyId(userId, companyId, score);
}

const getByUserIdAndCompanyId = async function (userId, companyId) {
  return await repo.getByUserIdAndCompanyId(userId, companyId);
}


module.exports = {
  getByUserIdAndCompanyId,
  setForUserIdAndCompanyId
};