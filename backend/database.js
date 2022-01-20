//External Dependencies import
const { connect, connection } = require("mongoose");

// Variable Declarations
let db;

/**
 * @name setup
 * @param  {} collectionname - The name of the collection
 * @param  {} connectURL - The URL to connect to MongoDB
 * @returns null
 * @description This function connects to MongoDB
 */
exports.setup = (collectionname, connectURL) => {
  const dbLink = connectURL + collectionname;
  connect(dbLink, { useNewUrlParser: true, useUnifiedTopology: true });

  db = connection;
  db.on(
    "error",
    console.error.bind(
      console,
      'Error while connecting to MongoDB using the following mongoURL: "' +
        dbLink +
        '"'
    )
  );
  db.once("open", function () {
    console.info(
      'Connected to MongoDB using collection "' + collectionname + '"'
    );
  });
};

exports.db = db;
