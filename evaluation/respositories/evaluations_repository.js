const { connectToMongo } = require("./db/conn");
const dbName = process.env.DBNAME;

const COLLECTION_NAME = "evaluations";

const getLatest = async function (userId) {
  let mongoClient; 
  let result;
  try {
    mongoClient = await connectToMongo();
    const collection = mongoClient.db(dbName).collection(COLLECTION_NAME);
    result = await collection.findOne({user_id: userId});
  } catch (error) {
    throw new Error(`Error in ${getLatest.name} from MongoDB: ${error.message}`);
  } finally {
    await mongoClient.close();
  }

  return result;
}

const createLatest = async function (evaluation) {
  let mongoClient; 
  const options = {upsert: true};
  try {
    mongoClient = await connectToMongo();
    const collection = mongoClient.db(dbName).collection(COLLECTION_NAME);
    await collection.replaceOne({user_id: evaluation.user_id}, evaluation, options);
    console.log(`Insertion on collection ${COLLECTION_NAME} succeeded`);
  } catch (error) {
    throw new Error(`Error in ${createLatest.name} from MongoDB: ${error.message}`);
  } finally {
    await mongoClient.close();
  }
}

module.exports = {
  getLatest,
  createLatest
};