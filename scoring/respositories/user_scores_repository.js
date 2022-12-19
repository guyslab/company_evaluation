const { Connection } = require("./db/conn");
const dbName = process.env.DBNAME;

const COLLECTION_NAME = "userscores";

const init = async function () {  
  let mongoClient;  
  try {
    mongoClient = await Connection.getInstance();
    const collection = mongoClient.db(dbName).collection(COLLECTION_NAME);
    const result = await collection.createIndex({ user_id: 1, company_id: 1 });
    console.log(`Index created: ${result} on collection ${COLLECTION_NAME}`);   
  } catch (error) {
    throw new Error(`Error in ${init.name} from MongoDB: ${error.message}`);
  }
}

const getByUserIdAndCompanyId = async function (user_id, company_id) {
  let mongoClient; 
  let result;
  try {
    mongoClient = await Connection.getInstance();
    const collection = mongoClient.db(dbName).collection(COLLECTION_NAME);
    result = await collection.findOne({user_id, company_id});
  } catch (error) {
    throw new Error(`Error in ${getByUserIdAndCompanyId.name} from MongoDB: ${error.message}`);
  }

  return result;
}

const getByUserId = async function (user_id) {
  let mongoClient; 
  let result;
  try {
    mongoClient = await Connection.getInstance();
    const collection = mongoClient.db(dbName).collection(COLLECTION_NAME);
    result = await collection.find({user_id}).toArray();
  } catch (error) {
    throw new Error(`Error in ${getByUserId.name} from MongoDB: ${error.message}`);
  }

  return result;
}

const setForUserIdAndCompanyId = async function (user_id, company_id, score) {
  let mongoClient; 
  const filter = { user_id, company_id };
  const options = { upsert: true };
  try {
    mongoClient = await Connection.getInstance();
    const collection = mongoClient.db(dbName).collection(COLLECTION_NAME);
    await collection.updateOne(filter, {$set: { score }}, options);
    console.log(`Update on collection ${COLLECTION_NAME} succeeded`);
  } catch (error) {
    throw new Error(`Error in ${setForUserIdAndCompanyId.name} from MongoDB: ${error.message}`);
  }
}

module.exports = {
  init,
  getByUserIdAndCompanyId,
  setForUserIdAndCompanyId,
  getByUserId
};