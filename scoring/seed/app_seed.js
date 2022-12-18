const weightsRepo = require('../respositories/weights_repository');
const companyRepo = require('../respositories/companies_repository');
const { SYSTEM_ADMIN_ID } = require('../constants');

const seed = async function (req, res, next) {
    await seedWeights();
    await seedCompanies();
    
    await next();
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
  }

  module.exports = {
    seed
  };