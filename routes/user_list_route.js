const { createUser, getUsers, getUserById,getUsersByEmail, updateUser, updateUserPassword, deleteUser, login } = require("../controllers/user_list_controller.js");
const router = require("express").Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/get-user-by-email", getUsersByEmail);
router.put("/", updateUser);
router.put("/update-password/:id", updateUserPassword);
router.delete("/:id", deleteUser);
router.post("/login", login);

module.exports = router;
