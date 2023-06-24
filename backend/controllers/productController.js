const Product = require("../models/productModel");
const { createError } = require("../utils/createError");

exports.createProduct = async (req, res, next) => {
  try {
    console.log(req.body);
    const product = await Product.create({
      ...req.body,
      user: req.user._id,
    });
    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

// exports.fetchAllProducts = async (req, res) => {
//   // filter = {"category":["smartphone","laptops"]}
//   // sort = {_sort:"price",_order="desc"}
//   // pagination = {_page:1,_limit=10}
//   let condition = {};
//   if (!req.query.admin) {
//     condition.deleted = { $ne: true };
//   }

//   let query = Product.find(condition);
//   let totalProductsQuery = Product.find(condition);

//   console.log(req.query.category);

//   if (req.query.category) {
//     query = query.find({ category: { $in: req.query.category.split(",") } });
//     totalProductsQuery = totalProductsQuery.find({
//       category: { $in: req.query.category.split(",") },
//     });
//   }
//   if (req.query.brand) {
//     query = query.find({ brand: { $in: req.query.brand.split(",") } });
//     totalProductsQuery = totalProductsQuery.find({
//       brand: { $in: req.query.brand.split(",") },
//     });
//   }
//   if (req.query._sort && req.query._order) {
//     query = query.sort({ [req.query._sort]: req.query._order });
//   }

//   const totalDocs = await totalProductsQuery.count().exec();
//   console.log({ totalDocs });

//   if (req.query._page && req.query._limit) {
//     const pageSize = req.query._limit;
//     const page = req.query._page;
//     query = query.skip(pageSize * (page - 1)).limit(pageSize);
//   }

//   try {
//     const docs = await query.exec();
//     res.set("X-Total-Count", totalDocs);
//     res.status(200).json(docs);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// };

exports.fetchAllProducts = async (req, res, next) => {
  try {
    let condition = {};
    let productsLimit = 10;
    let page = 1;

    let products = Product.find(condition);
    let totalCount = Product.find(condition);

    if (req.query._category) {
      products = products.find({
        category: { $in: req.query._category.split(",") },
      });

      totalCount = totalCount.find({
        category: { $in: req.query._category.split(",") },
      });
    }

    if (req.query._sort && req.query._order) {
      products = products.sort({ [req.query._sort]: req.query._order });
    }

    if (req.query._page) {
      page = req.query._page;
      products = products.skip(productsLimit * (page - 1));
    }

    totalCount = await totalCount.count().exec();
    const docs = await products.limit(productsLimit).exec();

    res.status(200).json({
      totalCount,
      productlength: docs.length,
      products: docs,
    });
  } catch (error) {
    next(error);
  }
};

exports.getFeaturedproducts = async (req, res, next) => {
  try {
    const products = await Product.find({ featured: true });
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    next(error);
  }
};

exports.getSingleProductById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) return next(createError("Product not found", 404));
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};
