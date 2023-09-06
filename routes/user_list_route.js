// import methods
const { createUser, getUsers, getUsersWithRequestStatus,getUserById, getUserByPhone, getAllPhoneNumbers,getUsersByEmail, updateUser, updateUserPassword, deleteUser, login, sendResetPasswordLink } = require("../controllers/user_list_controller.js");
const auth = require("../auth/auth_middleware.js");
const router = require("express").Router();

// routers
router.get("/", getUsers);
router.get("/phone-numbers", getAllPhoneNumbers);
router.get("/get-users-with-status", getUsersWithRequestStatus);
router.get("/:id", getUserById);
router.get("/phone/:phone", getUserByPhone);
router.post("/", createUser);
router.post("/get-user-by-email", getUsersByEmail);
router.put("/:id",  updateUser);
router.put("/update-password/:id", updateUserPassword);
router.delete("/:id", deleteUser);
router.post("/login", login);
router.post("/send-reset-password-link", sendResetPasswordLink);

// export router
module.exports = router;