const { SYSTEM_ADMIN_ID } = require('../constants');
const { connectToMongo } = require("./db/conn");
const dbName = process.env.DBNAME;

const COLLECTION_NAME = "weights";

const init = async function () {
  let mongoClient; 
  try {
    mongoClient = await connectToMongo();
    const collection = mongoClient.db(dbName).collection(COLLECTION_NAME);
    const result = await collection.createIndex({ user_id: 1 });
    console.log(`Index created: ${result} on collection ${COLLECTION_NAME}`);
  } catch (error) {
    throw new Error(`Error in ${init.name} from MongoDB: ${error.message}`);
  } finally {
    await mongoClient.close();
  }  
}

const getByUserId = async function (user_id) {
  let mongoClient; 
  let result;
  try {
    mongoClient = await connectToMongo();
    const collection = mongoClient.db(dbName).collection(COLLECTION_NAME);
    result = await collection.findOne({user_id});
  } catch (error) {
    throw new Error(`Error in ${getByUserId.name} from MongoDB: ${error.message}`);
  } finally {
    await mongoClient.close();
  } 

  return result;
}

const getDefault = async function () {
  let mongoClient; 
  let result;
  try {
    mongoClient = await connectToMongo();
    const collection = mongoClient.db(dbName).collection(COLLECTION_NAME);
    result = await collection.findOne({user_id: SYSTEM_ADMIN_ID});
    console.debug('Found defaults', JSON.stringify(result, null, 4));
  } catch (error) {
    throw new Error(`Error in ${getDefault.name} from MongoDB: ${error.message}`);
  } finally {
    await mongoClient.close();
  }   
  
  return result;
}

const update = async function (defaults, user_id) {
  let mongoClient; 
  const filter = { user_id };
  const options = { upsert: true };
  try {
    mongoClient = await connectToMongo();
    const collection = mongoClient.db(dbName).collection(COLLECTION_NAME);
    await collection.replaceOne(filter, { ...defaults, user_id }, options);
    console.log(`Update on collection ${COLLECTION_NAME} succeeded`);
  } catch (error) {
    throw new Error(`Error in ${update.name} from MongoDB: ${error.message}`);
  }  finally {
    await mongoClient.close();
  } 
}

module.exports = {
  init,
  getByUserId,
  getDefault,
  update
};