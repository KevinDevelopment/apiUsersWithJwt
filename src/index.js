require("dotenv").config();
const cors = require("cors");
const { createClient } = require("redis");
const client = createClient();
const express = require("express");
const app = express();
const helmet = require("helmet");
const router = require("./routes/routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "*"
}))
app.use(helmet());
app.use(router);

const PORT = process.env.SERVER_PORT;

const startup = async () => {
  await client.connect();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  });
}
startup();


