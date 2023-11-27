const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
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
    photo: {
      type: String,
      required: true,
    },
    rating: Number,
  }, 
  {
  timestamps: true,
  versionKey: false,
});

const ItemModel = mongoose.model('item', ItemSchema);
module.exports = ItemModel;