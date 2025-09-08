const express = require("express");
const router = express.Router();
const catwayController = require("../controllers/catwayController");

router.post("/catways", catwayController.createCatway);

module.exports = router;
