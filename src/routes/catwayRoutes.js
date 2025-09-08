const express = require("express");
const router = express.Router();
const catwayController = require("../controllers/catwayController");
const { createCatwayValidator } = require("../validators/catwayValidator");

router.post("/catways", createCatwayValidator, catwayController.createCatway);

module.exports = router;
