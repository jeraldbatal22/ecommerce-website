const express = require('express');
const router = express.Router();
const { getAllProducts, addProduct } = require('./../controller/productsController')
// const { checkProductPayload } = require('./../middleware/productValidation')

router.get('/', getAllProducts);
router.post('/add', addProduct);

module.exports = router;