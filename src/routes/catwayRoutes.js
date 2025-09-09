const express = require("express");
const router = express.Router();
const catwayController = require("../controllers/catwayController");
const {
    createCatwayValidator,
    getCatwayByIdValidator,
} = require("../validators/catwayValidator");

router.post("/", createCatwayValidator, catwayController.createCatway);
router.get("/", catwayController.getAllCatways);
router.get("/:id", getCatwayByIdValidator, catwayController.getCatwayById);
module.exports = router;
