const { Schema, default: mongoose } = require("mongoose");

const AddProductSchema = new Schema({
  productId: {
    ref: "Product",
    type: String,
  },
  quantity: Number,
  userId: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AddProductModel = mongoose.model("AddCart", AddProductSchema);
module.exports = AddProductModel;
