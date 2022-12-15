const { MongoClient } = require("mongodb");
const connectionString = process.env.MONGO_URI;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true
});

let dbConnection;

const connectToDb = async function (dbName) {
  const connection = await client.connect();
  if (!connection){
    throw new Error("Error connecting to MongoDB");
  }
  dbConnection = connection.db(dbName);
  console.log("Successfully connected to MongoDB.");
}

const getDb = function () {
  return dbConnection;
}

module.exports = {
  connectToDb,
  getDb
};