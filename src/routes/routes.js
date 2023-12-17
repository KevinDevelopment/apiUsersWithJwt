const express = require("express");
const router = express.Router();

const limiter = require("../middleware/rateLimit");
const authenticate = require("../middleware/authentication");

const CreateUserController = require("../controllers/CreateUserController");
const ListAllUsersController = require("../controllers/ListAllUsersContrroller");
const UpdateUserController = require("../controllers/UpdateUserController");
const DeleteUserController = require("../controllers/DeleteUserController");
const UserLoginController = require("../controllers/UserLoginController")
const RegisterNewUserService = require("../controllers/RegisterNewUserController");

router.post("/signin", limiter, UserLoginController.userLogin);
router.post("/register/user", limiter, CreateUserController.createUser);
router.post("/user", RegisterNewUserService.registerUser);
router.get("/users", authenticate, ListAllUsersController.listAllUsers);
router.patch("/user", authenticate, UpdateUserController.updateUser);
router.delete("/user/:id", authenticate, DeleteUserController.deleteUser);

module.exports = router;

