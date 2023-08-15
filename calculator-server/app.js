const express = require("express");
const app = express();
const router = require("../calculator-server/controllers/calculator-stateless");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1/calculator", router.answer);
app.listen(port, (error) => {
  if (error) {
    console.error("server did not start", error);
    return;
  }
  console.log("server is up");
});
