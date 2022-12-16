const repo = require('../respositories/weights_repository');
const { SYSTEM_ADMIN_ID } = require('../constants');

const setWeightsForUser = async function (weights, userId) {
  await repo.init();
  if (userId !== SYSTEM_ADMIN_ID){
    const defaults = await getDefaultWeights();
    if (!defaults) {
      throw new Error('No default weights exist');
    }

    weights.user_scoring = defaults.user_scoring;
  }

  console.debug ('Weights to update', JSON.stringify(weights, null, 4));
  if (weights.company_size + weights.company_funding + weights.company_age + weights.user_scoring != 1){
    throw new Error('Provided weights do not sum up to 1');
  }
  
  await repo.update(weights, userId);
}

const getWeightsForUser = async function (userId) {
  await repo.init();
  return await repo.getByUserId(userId);
}

const getDefaultWeights = async function () {
  await repo.init();
  return await repo.getDefault();
}

module.exports = {
  setWeightsForUser,
  getWeightsForUser,
  getDefaultWeights
};