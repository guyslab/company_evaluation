const service = require('../services/weights_service');

const configureWeights = async function (req, res) {
  const desiredUserId = req.params.user_id;
  const actualUserId = req.headers['x-user-id'];
  if (actualUserId !== desiredUserId){
    res.status(403).send(`Cannot configure weights for user: ${desiredUserId}`);
    return;
  }

  const weights = req.body;
  let result;
  try {
    result = await service.setWeightsForUser(weights, actualUserId);
  } catch (error) {
    console.error(error);
    res.status(400).send(`Error setting weights. ${error.message}`);
  }
  
  res.status(200).send();
}

const getWeights = async function (req, res) {
  const desiredUserId = req.params.user_id;
  const actualUserId = req.headers['x-user-id'];
  if (actualUserId !== desiredUserId){
    res.status(403).send(`Cannot get weights for user: ${desiredUserId}`);
    return;
  }

  let result;
  try {
    result = await service.getWeightsForUser(actualUserId);
    if (!!result){
      delete result._id;
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(`Error getting weights. ${error.message}`);
  }
  
  res.status(200).send(result);
}

module.exports = {
  configureWeights,
  getWeights
};