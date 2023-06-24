const { Router } = require("express");
const { verifyUser, verifyAdmin } = require("../middlewares/auth");
const {
  createCategory,
  getAllCategories,
} = require("../controllers/categoryController");

const router = Router();
//Create
router.post("/create", verifyUser, verifyAdmin, createCategory);
//Get All
router.get("/all", getAllCategories);

module.exports = router;
