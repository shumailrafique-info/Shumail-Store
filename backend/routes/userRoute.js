const { Router } = require("express");
const {
  createUser,
  loginUser,
  updateUserProfile,
  logoutUser,
  getLoggedInUserDetails,
  updateUserPassword,
  getSingleUser,
  getAllUseres,
  deleteAnyUser,
  updateUserRole,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");
const { verifyUser, verifyAdmin } = require("../middlewares/auth");

const router = Router();

//create User
router.post("/register", createUser);
//login User
router.post("/login", loginUser);
//logout User
router.get("/logout", logoutUser);
//logout User
router.get("/me", verifyUser, getLoggedInUserDetails);
//Update Password
router.put("/update/password", verifyUser, updateUserPassword);
//forget Password
router.post("/forgot/password", forgotPassword);
//forget Password
router.post("/password/reset/:resetToken", resetPassword);
//forget Password
router.post("/forgot/password", forgotPassword);
//Update Profile
router.put("/update/profile", verifyUser, updateUserProfile);
//Get Single User with Id
router.get("/any/:id", verifyUser, verifyAdmin, getSingleUser);
//Delete Single User with Id
router.delete("/any/:id", verifyUser, verifyAdmin, deleteAnyUser);
//Get Single User with Id
router.get("/all", verifyUser, verifyAdmin, getAllUseres);
//Update Single User role with Id
router.put("/any/:id", verifyUser, verifyAdmin, updateUserRole);

module.exports = router;
