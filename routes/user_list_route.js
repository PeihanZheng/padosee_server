const { createUser, getUsers, getUserById, updateUser, updateUserPassword, deleteUser, login } = require("../controllers/user_list_controller.js");
const router = require("express").Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/", updateUser);
router.put("/update-password/:id", updateUserPassword);
router.delete("/:id", deleteUser);
router.post("/login", login);

module.exports = router;
