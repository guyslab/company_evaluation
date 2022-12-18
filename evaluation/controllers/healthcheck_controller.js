const healthcheck = function (req, res) {
  res.send({"service":"scoring", "status": "OK"});
}

module.exports = {
  healthcheck
};