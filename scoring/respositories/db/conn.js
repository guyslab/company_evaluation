const MongoClient = require('mongodb').MongoClient;

class Connection {

  static async getInstance() {
      if (Connection.db) return Connection.db
      Connection.db = await MongoClient.connect(this.url, this.options)
      return Connection.db
  }

}

Connection.db = null
Connection.url = process.env.MONGO_URI;
Connection.options = {
  useNewUrlParser:    true,
  useUnifiedTopology: true,
}

module.exports = { Connection }


// const { MongoClient } = require("mongodb");
// const connectionString = process.env.MONGO_URI;

// let client;
// let connection;

// const connectToMongo = async function connect() {
//   if (connection) {
//     return connection;
//   }

//   try {
//     client = new MongoClient(connectionString, {
//       useNewUrlParser: true
//     });
//     connection = await client.connect();
//     if (!connection){
//       throw new Error("Error connecting to MongoDB");
//     }
//     console.log("Successfully connected to MongoDB.");

//   } catch (error) {
//     await client.close();
//     console.error(`Error connecting to MongoDB database ${dbName}`, error);
//     process.exit();
//   }

//   return connection;
// }

// module.exports = {
//   connectToMongo,
// };