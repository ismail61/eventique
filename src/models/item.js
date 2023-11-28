const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    vendorId: {
      type: String,
      required: true,
      index: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
      min: 1,
    },
    quantity:  {
      type: Number,
      required: true,
      min: 1,
    },
    image: {
      type: String,
      required: true,
    },
  }, 
  {
  timestamps: true,
  versionKey: false,
});

const ItemModel = mongoose.model('item', ItemSchema);
module.exports = ItemModel;