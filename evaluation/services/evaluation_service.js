const repo = require('../respositories/evaluations_repository');
const SCORING_URI = process.env.SCORING_URI;
const axios = require('axios');

const getLatestEvaluation = async function(userId) {
    return await repo.getLatest(userId);
}

const evaluate = async function (userId) {
    const latest = await repo.getLatest();
    const companyIds = latest.results.map(r => r.company_id);
    const reqConfs = companyIds.map(cid => { return {
        url: `${SCORING_URI}/companies/${cid}/evaluations`,
        headers: {'x-user-id': userId, 'Content-Type': 'application/json' },
        method: "post"
    }});
    let responses;
    try {
        const requests = reqConfs.map(cnf => axios.request(cnf));
        responses = await Promise.all(requests);   
    } catch (err) {
        console.error('HTTP error: ', err.response.status, err.response.statusText, err.message, err.response.headers);
        throw new Error(err.response.statusText);
    }    
    const json = responses.map(response => response.data);    
    const data = await Promise.all(json);
    console.debug('evaluate: fetched data:', data);

    await repo.createLatest({user_id: userId, updated_utc: Date.now(), results: data});
}

module.exports = {
    evaluate,
    getLatestEvaluation
};