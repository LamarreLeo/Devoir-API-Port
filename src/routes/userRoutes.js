const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const userValidator = require("../validators/userValidator");

router.post("/", userValidator.registerValidator, userController.createUser);
router.get("/", userController.getAllUsers);

module.exports = router;
