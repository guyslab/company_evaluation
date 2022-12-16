const { connectToMongo } = require("./db/conn");
const dbName = process.env.DBNAME;

const COLLECTION_NAME = "companies";

const init = async function () {
  let mongoClient;  
  try {
    mongoClient = await connectToMongo();
    const collection = mongoClient.db(dbName).collection(COLLECTION_NAME);
    const result = await collection.createIndex({ company_id: 1 });
    console.log(`Index created: ${result} on collection ${COLLECTION_NAME}`);
  } catch (error) {
    throw new Error(`Error in ${init.name} from MongoDB: ${error.message}`);
  } finally {
    await mongoClient.close();
  }
}

const getById = async function (companyId) {
  let mongoClient; 
  const query = { companyId };
  let result;
  try {
    mongoClient = await connectToMongo();
    const collection = mongoClient.db(dbName).collection(COLLECTION_NAME);
    result = await collection.findOne(query);
  } catch (error) {
    throw new Error(`Error in ${getById.name} from MongoDB: ${error.message}`);
  } finally {
    await mongoClient.close();
  }

  return result;
}

const create = async function (company) {
  if (!company.companyId){
    throw new Error('companyId must be provider');
  }
  
  let mongoClient; 
  try {
    mongoClient = await connectToMongo();
    const collection = mongoClient.db(dbName).collection(COLLECTION_NAME);
    await collection.insertOne(company);
    console.log(`Insertion on collection ${COLLECTION_NAME} succeeded`);
  } catch (error) {
    throw new Error(`Error in ${create.name} from MongoDB: ${error.message}`);
  } finally {
    await mongoClient.close();
  }
}

module.exports = {
  init,
  getById,
  create
};