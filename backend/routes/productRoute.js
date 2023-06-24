const { Router } = require("express");
const {
  createProduct,
  // getAllProducts,
  fetchAllProducts,
  getFeaturedproducts,
  getSingleProductById,
} = require("../controllers/productController");
const { verifyUser, verifyAdmin } = require("../middlewares/auth");

const router = Router();

router.post("/create", verifyUser, verifyAdmin, createProduct);
router.get("/all", fetchAllProducts);
router.get("/any/:id", getSingleProductById);
router.get("/featured", getFeaturedproducts);

module.exports = router;
