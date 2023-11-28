const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: [
    {
      id: String,
      quantity: Number,
      _id: false,
    },
  ],
}, {
  timestamps: true,
  versionKey: false,
});

const CartModel = mongoose.model('cart', CartSchema);
module.exports = CartModel;
