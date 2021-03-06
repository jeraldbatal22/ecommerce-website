const mongoose = require('mongoose');

const Product = () => {
  const { Schema, model } = mongoose;
  const productSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true, default: 0 },
    reviews: { type: Number, required: true, default: 0 },
    stock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
  },
    {
      timestamps: true
    });
  return model('Product', productSchema)
}

module.exports = Product()