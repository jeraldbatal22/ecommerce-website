const express = require('express');
const router = express.Router();
const productsRouter = require('./productRouter');
const userRouter = require('./userRouter');
const imageRouter = require('./imageRouter');

router.use('/products', productsRouter);
router.use('/users', userRouter);
router.use('/image', imageRouter);

module.exports = router;