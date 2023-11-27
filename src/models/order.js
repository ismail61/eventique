const mongoose = require('mongoose');
const OrderStatusEnum = require('./enum');

const ProductSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      trim: true,
      required: true,
    },
    photo: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    _id: false,
  },
);


const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: OrderStatusEnum.CONFIRMED,
  },
  products: {
    type: [ProductSchema],
  },
  paymentMethod: String,
  totalPrice: {
    type: Number,
    required: true,
  }
}, {
  timestamps: true,
  versionKey: false,
});

const OrderModel = mongoose.model('order', orderSchema);
module.exports = OrderModel;