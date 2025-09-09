const express = require("express");
const router = express.Router();
const catwayController = require("../controllers/catwayController");
const {
    createCatwayValidator,
    getCatwayByIdValidator,
} = require("../validators/catwayValidator");

router.post("/catways", createCatwayValidator, catwayController.createCatway);
router.get("/catways", catwayController.getAllCatways);
module.exports = router;
