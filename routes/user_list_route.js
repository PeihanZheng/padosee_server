// import methods
const { createUser, getUsers, getUserById,getUsersByEmail,getUserByPhone, updateUser, updateUserPassword, deleteUser, login, sendResetPasswordLink } = require("../controllers/user_list_controller.js");
const auth = require("../auth/auth_middleware.js");
const router = require("express").Router();

// routers
router.get("/", getUsers);
router.get("/:id", auth, getUserById);
router.get("/phone/:phone", getUserByPhone);
router.post("/", createUser);
router.post("/get-user-by-email", getUsersByEmail);
router.put("/:id", auth, updateUser);
router.put("/update-password/:id", updateUserPassword);
router.delete("/:id", deleteUser);
router.post("/login", login);
router.post("/send-reset-password-link", sendResetPasswordLink);

// export router
module.exports = router;