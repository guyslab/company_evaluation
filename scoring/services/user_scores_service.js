const repo = require('../respositories/user_scores_repository');

const setForUserIdAndCompanyId = async function (userId, companyId, score) {
  await repo.init();
  await repo.setForUserIdAndCompanyId(userId, companyId, score);
}

const getByUserIdAndCompanyId = async function (userId, companyId) {
  await repo.init();
  return await repo.getByUserIdAndCompanyId(userId, companyId);
}


module.exports = {
  getByUserIdAndCompanyId,
  setForUserIdAndCompanyId
};