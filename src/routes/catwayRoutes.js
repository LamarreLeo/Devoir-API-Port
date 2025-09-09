const express = require("express");
const router = express.Router();
const catwayController = require("../controllers/catwayController");
const catwayValidator = require("../validators/catwayValidator");

router.post(
    "/",
    catwayValidator.createCatwayValidator,
    catwayController.createCatway
);
router.get("/", catwayController.getAllCatways);
router.get(
    "/:id",
    catwayValidator.getCatwayByIdValidator,
    catwayController.getCatwayById
);
router.put(
    "/:id",
    catwayValidator.updateCatwayStateValidator,
    catwayController.updateCatwayState
);
router.delete(
    "/:id",
    catwayValidator.getCatwayByIdValidator,
    catwayController.deleteCatway
);
module.exports = router;
