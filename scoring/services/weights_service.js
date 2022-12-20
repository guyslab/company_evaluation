const repo = require('../respositories/weights_repository');
const { SYSTEM_ADMIN_ID } = require('../constants');

const setWeightsForUser = async function (weights, userId) {
  let defaults;

  await repo.init();
  if (userId !== SYSTEM_ADMIN_ID){
    defaults = await getDefaultWeights();
    if (!defaults) {
      throw new Error('No default weights exist');
    }

    weights.user_scoring = defaults.user_scoring;
  }

  if (!weights.company_size) weights.company_size = defaults.company_size;
  if (!weights.company_funding) weights.company_funding = defaults.company_funding;
  if (!weights.company_age) weights.company_age = defaults.company_age;

  const weightsSum = parseFloat((weights.company_size + weights.company_funding + weights.company_age + weights.user_scoring).toFixed(3));
  console.debug ('Weights to update', JSON.stringify(weights, null, 4), ' weights sum = ' + weightsSum);
  if (weightsSum !== 1){
    throw new Error('Provided weights do not sum up to 1');
  }
  
  await repo.update(weights, userId);
}

const getWeightsForUser = async function (userId) {
  await repo.init();
  let userWeights = await repo.getByUserId(userId);
  if (!userWeights || !userWeights.company_size || !userWeights.company_funding || !userWeights.company_age) {
    const defaultWeights = await getDefaultWeights();
    if (!userWeights) userWeights = {};
    if (!userWeights.company_size) userWeights.company_size = defaultWeights.company_size;
    if (!userWeights.company_funding) userWeights.company_funding = defaultWeights.company_funding;
    if (!userWeights.company_age) userWeights.company_age = defaultWeights.company_age;
    userWeights.user_scoring = defaultWeights.user_scoring;
  }

  return userWeights;
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