const ProductModel = require("../models/Product");

exports.checkProductPayload = async (req, res, next) => {
  const Product = await ProductModel
  const { name = "", slug = "", category = "", price = "", stock = "", description = "", image = "" } = req.body;
  // res.json({ name, slug, category,  price, stock, description })
  // console.log(name, slug, category, price, stock, description)
  const errors = []
  // console.log(name, slug, category, price, stock, description)
  if (name === "") {
    errors.push('Name is required ')
  }
  if (slug === "") {
    errors.push('Slug  is required ')
  } else {
    const product = await Product.findOne({ slug: slug })
    if (product) {
      errors.push('Slug is already exist')
    }
  }
  if (category === "") {
    errors.push('Category is required')
  }
  if (req.files === null || image === "") {
    errors.push('Image is required')
  }
  if (price === "") {
    errors.push('Price is required')
  }
  if (stock === "") {
    errors.push('Stock is required')
  }
  if (description === "") {
    errors.push('Description is required')
  }

  if (errors.length > 0) {
    return res.status(400).json({ status: 'error', errors: errors, message: 'Bad request' })
  };

  next();
}