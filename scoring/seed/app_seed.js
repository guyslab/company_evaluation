const weightsRepo = require('../respositories/weights_repository');
const companyRepo = require('../respositories/companies_repository');
const { SYSTEM_ADMIN_ID } = require('../constants');

const seed = async function (req, res, next) {
    await seedWeights();
    await seedCompanies();

    res.status(201).send();
  }

  async function seedWeights(){
    await weightsRepo.update({
      "company_size": 0.3, 
      "company_funding": 0.4, 
      "company_age": 0.2, 
      "user_scoring": 0.1
    },
    SYSTEM_ADMIN_ID);
  }

  async function seedCompanies() {
    await companyRepo.create({
      company_id: "A",
      company_size: 8,
      company_funding: 12000000,
      company_age: 1.8      
    });
    await companyRepo.create({
      company_id: "B",
      company_size: 80,
      company_funding: 154000000,
      company_age: 12.1     
    });
    await companyRepo.create({
      company_id: "C",
      company_size: 477,
      company_funding: 9694,
      company_age: 10.1     
    });
    await companyRepo.create({
      company_id: "D",
      company_size: 80,
      company_funding: 2000,
      company_age: 9     
    });
    await companyRepo.create({
      company_id: "E",
      company_size: 80,
      company_funding: 800000,
      company_age: 4     
    });
    await companyRepo.create({
      company_id: "F",
      company_size: 4446,
      company_funding: 235,
      company_age: 2.1     
    });
    await companyRepo.create({
      company_id: "G",
      company_size: 54,
      company_funding: 783754,
      company_age: 5.1     
    });
    await companyRepo.create({
      company_id: "H",
      company_size: 800,
      company_funding: 15040000,
      company_age: 8.1     
    });
  }

  module.exports = {
    seed
  };