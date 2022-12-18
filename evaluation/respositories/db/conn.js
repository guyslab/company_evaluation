const { MongoClient } = require("mongodb");
const connectionString = process.env.MONGO_URI;

let client;

const connectToMongo = async function connect() {
  try {
    client = new MongoClient(connectionString, {
      useNewUrlParser: true
    });
    const connection = await client.connect();
    if (!connection){
      throw new Error("Error connecting to MongoDB");
    }
    console.log("Successfully connected to MongoDB.");

  } catch (error) {
    await client.close();
    console.error(`Error connecting to MongoDB database ${dbName}`, error);
    process.exit();
  }

  return client;
}

module.exports = {
  connectToMongo
};