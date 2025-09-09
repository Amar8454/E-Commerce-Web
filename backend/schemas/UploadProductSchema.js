const mongoose = require("mongoose");

const UploadProductSchemas = new mongoose.Schema({
  product: {
    type: String,
  },
  brandName: {
    type: String,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  sellingPrice: {
    type: Number,
  },
  uploadProductImage: [],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ProductModel = mongoose.model("Product", UploadProductSchemas);
module.exports = ProductModel;
