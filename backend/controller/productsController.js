const Product = require('./../models/Product');
const path = require('path');
const { uploadFile } = require('../helpers');
const asyncHandler = require('./../middleware/asyncHandler')

// const uploadFile = require("../middleware/upload");

// function uploadImage (req, res) {
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send('No files were uploaded.');
//   }

//   // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//   sampleFile = req.files.sampleFile;
//   uploadPath = __dirname + '/somewhere/on/your/server/' + sampleFile.name;

//   // Use the mv() method to place the file somewhere on your server
//   sampleFile.mv(uploadPath, function(err) {
//     if (err)
//       return res.status(500).send(err);

//     res.send('File uploaded!');
//   });
// }

exports.getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).send({
    products,
    message: "Successfully get all products",
    status: 'sucess'
  });
});

exports.addProduct = asyncHandler(async (req, res, next) => {
  // if (!req.files || Object.keys(req.files).length === 0) {
  //   const error = new Error('No file Uploaded')
  //   return next(error);
  // }

  // const file = req.files.image;
  // const basePath = __dirname.replace('\\controller', '');
  // const uploadPath = path.join(basePath, 'resources/products', file.name);
  // await uploadFile(file, uploadPath);

  const payload = req.body;
  console.log(payload)
  const product = await Product.findOne({ slug: payload.slug })
  if (product) {
    const error = new Error('Slug is already exist');
    return next(error);
  }

  const ress = await Product.create(payload);
  res.status(200).send({
    message: 'Successfully add product',
    status: 'success',
    data: ress
  });
});