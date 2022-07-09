import Mongoose from "mongoose";

let database: Mongoose.Connection;

export const connect = async () => {
  const mongoURI = process.env.COSMOSDB_URI;

  if (database) {
    return;
  }

  await Mongoose.connect(mongoURI).then(() => {
    console.log("CosmosDB connected");
  });

  database = Mongoose.connection;

  database.once("open", async () => {
    console.log("Connected to database");
  });

  database.on("error", async () => {
    console.log("Error in connecting to the database");
  });
};

export const disconnect = () => {
  if (!database) {
    return;
  }

  Mongoose.disconnect();

  database.once("close", async () => {
    console.log("Disconnected from database");
  });
};
