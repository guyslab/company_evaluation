const repo = require('../respositories/companies_repository');
const userScoresService = require('./user_scores_service');
const weightsService = require('./weights_service');

const evaluateCompany = async function (userId, companyId) {
    await repo.init();
    const company = await repo.getById(companyId);
    const { score: userScore } = await userScoresService.getByUserIdAndCompanyId(userId, companyId);
    const defaultWeights = await weightsService.getDefaultWeights();
    const userWeights = await weightsService.getWeightsForUser(userId);

    const ave = company.company_size * (userWeights.company_size || defaultWeights.company_size)
        + company.company_funding * (userWeights.company_funding || defaultWeights.company_funding)
        + company.company_age * (userWeights.company_age || defaultWeights.company_age)
        + (userScore || 0) * (userWeights.user_scoring || defaultWeights.user_scoring);

    return ave;
}

module.exports = {
    evaluateCompany
};