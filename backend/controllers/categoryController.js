const Category = require("../models/categoryModel");

exports.createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({
      success: true,
      category,
    });
  } catch (error) {
    next(error);
  }
};
exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().select("-_id");
    res.status(201).json({
      success: true,
      categories,
    });
  } catch (error) {
    next(error);
  }
};
