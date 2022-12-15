const { getDb } = require("./db/conn");

const collectionName = "userscores";
const SYSTEM_ADMIN_ID = "SYSTEM_ADMIN";

const init = async function () {
  const collection = getDb().collection(collectionName);
  try {
    const result = await collection.createIndex({ user_id: 1, company_id: 1 });
    console.log(`Index created: ${result} on collection ${collectionName}`);
  } catch (error) {
    throw new Error(`Error in ${init.name} from MongoDB: ${error.message}`);
  }   
}

const getByUserIdAndCompanyId = async function (user_id, company_id) {
  const collection = getDb().collection(collectionName);
  let result;
  try {
    result = await collection.findOne({user_id, company_id});
  } catch (error) {
    throw new Error(`Error in ${getByUserIdAndCompanyId.name} from MongoDB: ${error.message}`);
  }

  return result;
}

const setForUserIdAndCompanyId = async function (user_id, company_id, score) {
  const collection = getDb().collection(collectionName);
  const filter = { user_id, company_id };
  const options = { upsert: true };
  try {
    await collection.updateOne(filter, {$set: score}, options);
    console.log(`Update on collection ${collectionName} succeeded`);
  } catch (error) {
    throw new Error(`Error in ${setForUserIdAndCompanyId.name} from MongoDB: ${error.message}`);
  }   
}

module.exports = {
  init,
  getByUserIdAndCompanyId,
  setForUserIdAndCompanyId
};