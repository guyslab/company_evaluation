const repo = require('../respositories/weights_repository');

const setWeightsForUser = async function (weights, userId) {
    await repo.update(weights, userId);
}

const getWeightsForUser = async function (userId) {
  return await repo.getByUserId(userId);
}

const getDefaultWeights = async function () {
  return await repo.getDefaultWeights();
  
}

module.exports = {
  setWeightsForUser,
  getWeightsForUser,
  getDefaultWeights
};