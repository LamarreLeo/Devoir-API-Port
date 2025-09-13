const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const userValidator = require("../validators/userValidator");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/login", userValidator.loginValidator, userController.userLogin);
router.get("/logout", userController.userLogout);

router.use(authMiddleware);

router.post("/", userValidator.registerValidator, userController.createUser);
router.get("/", userController.getAllUsers);
router.get(
    "/:email",
    userValidator.getUserByEmailValidator,
    userController.getUserByEmail
);
router.put(
    "/:email",
    userValidator.updateUserValidator,
    userController.updateUser
);
router.delete(
    "/:email",
    userValidator.getUserByEmailValidator,
    userController.deleteUser
);

module.exports = router;
