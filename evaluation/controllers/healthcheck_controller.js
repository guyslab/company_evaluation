const healthcheck = function (req, res) {
  res.send({"service":"evaluation", "status": "OK"});
}

module.exports = {
  healthcheck
};