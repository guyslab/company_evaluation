const service = require('../services/weights_service');

const configureWeights = async function (req, res) {
  const desiredUserId = req.body.user_id;
  const actualUserId = req.headers['x-user-id'];
  if (actualUserId !== desiredUserId){
    res.status(403).send(`Cannot configure weights for user: ${desiredUserId}`);
    return;
  }

  const weights = req.body.weights;
  let result;
  try {
    result = await service.setWeightsForUser(weights, actualUserId);
  } catch (error) {
    console.error(error);
    res.status(400).send(`Error setting weights`);
  }   
}

module.exports = {
  configureWeights
};