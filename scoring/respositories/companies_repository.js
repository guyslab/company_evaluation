const { getDb } = require("./db/conn");

const collectionName = "companies";

const init = async function () {
  const collection = getDb().collection(collectionName);
  try {
    const result = await collection.createIndex({ company_id: 1 });
    console.log(`Index created: ${result} on collection ${collectionName}`);
  } catch (error) {
    throw new Error(`Error in ${init.name} from MongoDB: ${error.message}`);
  }

  return result;
}

const getById = async function (companyId) {
  const collection = getDb().collection(collectionName);
  const query = { companyId };
  let result;
  try {
    result = await collection.findOne(query);
  } catch (error) {
    throw new Error(`Error in ${getById.name} from MongoDB: ${error.message}`);
  }   

  return result;
}

const create = async function (company) {
  if (!company.companyId){
    throw new Error('companyId must be provider');
  }

  const collection = getDb().collection(collectionName);
  try {
    await collection.insertOne(company);
    console.log(`Insertion on collection ${collectionName} succeeded`);
  } catch (error) {
    throw new Error(`Error in ${create.name} from MongoDB: ${error.message}`);
  }   
}

module.exports = {
  init,
  getById,
  create
};