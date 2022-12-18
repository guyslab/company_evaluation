const repo = require('../respositories/companies_repository');
const userScoresService = require('./user_scores_service');
const weightsService = require('./weights_service');

const evaluateCompany = async function (userId, companyId) {
    await repo.init();
    const company = await repo.getById(companyId);

    const { score: userScore } = await userScoresService.getByUserIdAndCompanyId(userId, companyId) || {};
    const defaultWeights = await weightsService.getDefaultWeights();
    const userWeights = await weightsService.getWeightsForUser(userId);

    const props = ['company_size', 'company_funding', 'company_age', 'user_scoring']
    const finalWeights = Object.assign(...props.map(key => ({[key]: userWeights && userWeights[key] || defaultWeights[key]})));

    const ave = company.company_size * finalWeights.company_size
        + company.company_funding * finalWeights.company_funding
        + company.company_age * finalWeights.company_age
        + (userScore || 0) * finalWeights.user_scoring;

    return ave;
}

module.exports = {
    evaluateCompany
};