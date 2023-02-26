require("dotenv").config();
const express = require("express");
const app = express();
const helmet = require("helmet");
const router = require("./routes/routes");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());
app.use(router);

const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});