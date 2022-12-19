const { Connection } = require("./db/conn");
const dbName = process.env.DBNAME;

const COLLECTION_NAME = "companies";

const init = async function () {
  let mongoClient;  
  try {
    mongoClient = await Connection.getInstance();
    const collection = mongoClient.db(dbName).collection(COLLECTION_NAME);
    const result = await collection.createIndex({ company_id: 1 });
    console.log(`Index created: ${result} on collection ${COLLECTION_NAME}`);
  } catch (error) {
    throw new Error(`Error in ${init.name} from MongoDB: ${error.message}`);
  } 
}

const getById = async function (company_id) {
  let mongoClient; 
  const query = { company_id };
  let result;
  try {    
    mongoClient = await Connection.getInstance();
    const collection = mongoClient.db(dbName).collection(COLLECTION_NAME);
    result = await collection.findOne(query);
  } catch (error) {
    throw new Error(`Error in ${getById.name} from MongoDB: ${error.message}`);
  } 

  return result;
}

const create = async function (company) {
  if (!company.company_id){
    throw new Error('companyId must be provider');
  }
  
  let mongoClient; 
  try {
    mongoClient = await Connection.getInstance();
    const collection = mongoClient.db(dbName).collection(COLLECTION_NAME);
    await collection.insertOne(company);
    console.log(`Insertion on collection ${COLLECTION_NAME} succeeded`);
  } catch (error) {
    throw new Error(`Error in ${create.name} from MongoDB: ${error.message}`);
  } 
}

module.exports = {
  init,
  getById,
  create
};