const { getDb } = require("./db/conn");

const collectionName = "weights";
const SYSTEM_ADMIN_ID = "SYSTEM_ADMIN";

const init = async function () {
  const collection = getDb().collection(collectionName);
  try {
    const result = await collection.createIndex({ user_id: 1 });
    console.log(`Index created: ${result} on collection ${collectionName}`);
    await collection.insertOne({
      user_id: SYSTEM_ADMIN_ID,
      company_size: 0.3,
      company_funding: 0.4,
      company_age: 0.2,
      user_scoring: 0.1    
    });
    console.log(`Initialized collection ${collectionName}`);
  } catch (error) {
    throw new Error(`Error in ${init.name} from MongoDB: ${error.message}`);
  }   
}

const getByUserId = async function (user_id) {
  const collection = getDb().collection(collectionName);
  let result;
  try {
    result = await collection.findOne({user_id});
  } catch (error) {
    throw new Error(`Error in ${getByUserId.name} from MongoDB: ${error.message}`);
  }

  return result;
}

const getDefault = async function () {
  const collection = getDb().collection(collectionName);
  let result;
  try {
    result = await collection.findOne({user_id: SYSTEM_ADMIN_ID});
  } catch (error) {
    throw new Error(`Error in ${getDefault.name} from MongoDB: ${error.message}`);
  }  
  
  return result;
}

const update = async function (defaults, user_id) {
  const collection = getDb().collection(collectionName);
  const filter = { user_id };
  const options = { upsert: true };
  try {
    await collection.updateOne(filter, {$set: defaults}, options);
    console.log(`Update on collection ${collectionName} succeeded`);
  } catch (error) {
    throw new Error(`Error in ${update.name} from MongoDB: ${error.message}`);
  }   
}

module.exports = {
  init,
  getByUserId,
  update
};