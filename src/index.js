const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const { PORT } = require("./config/server.config");
const apiRouter = require("./routes");
const errorHandler = require("./utils/errorHandler");
const connectToDB = require("./config/db.config");

const app = express();

app.use(cors({
  origin: "*"
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.get("/ping", (req, res) => {
  return res.json({ message: "Problem Service is alive" });
});

app.use("/api", apiRouter);

// last middleware if any error comes
app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Problem-Server listenning on ${PORT}`);
  await connectToDB();
  console.log("Successfully connected to db");
});
