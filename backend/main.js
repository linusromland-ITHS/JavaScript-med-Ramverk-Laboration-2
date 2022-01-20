//External Dependencies import
const express = require("express");
const ip = require("ip");
const history = require("connect-history-api-fallback");
const path = require("path");
const dotenv = require("dotenv");

//Configuring dotenv
if (process.env.NODE_ENV === "development") dotenv.config();

//Local Dependencies Import
const database = require("./database");

//Variable Declarations
const port = process.env.PORT || 3000;
const mongoURL = process.env.MONGOURL || "mongodb://localhost:27017/";

//Configuring express
const app = express();
app.use(express.json());

//Connecting to MongoDB
database.setup("ChatBubble", mongoURL);

//Configure Express for Vue History Mode
app.use(history());

//Adds VueJS build
app.use("/", express.static(path.join(path.resolve(), "../frontend/dist")));

app.listen(port, () => {
  console.log(
    `\nApp running at:\n- Local: \x1b[36mhttp://localhost:${port}/\x1b[0m\n- Network \x1b[36mhttp://${ip.address()}:${port}/\x1b[0m\n\nTo run for production, run \x1b[36mnpm run start\x1b[0m`
  );
});
