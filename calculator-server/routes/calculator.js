const express = require("express");
const router = express.Router();
const { answer } = require("../controllers/calculator-stateless");

router.route("/").post(answer);
module.exports = router;
