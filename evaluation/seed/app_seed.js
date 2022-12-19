const evaluationRepo = require('../respositories/evaluations_repository');

const seed = async function (req, res) {
    await seedLatestEvaluation();
    res.status(201).send();
  }

  async function seedLatestEvaluation() {
    await evaluationRepo.createLatest({
      "updated_utc": Date.now(),
      "results" :[
        { "company_id": "A", "score": 0 },
        { "company_id": "B", "score": 0 },
        { "company_id": "C", "score": 0 },
        { "company_id": "D", "score": 0 },
        { "company_id": "E", "score": 0 },
        { "company_id": "F", "score": 0 },
        { "company_id": "G", "score": 0 },
        { "company_id": "H", "score": 0 },
      ]})
  }

  module.exports = {
    seed
  };