const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  iban: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

const VendorModel = mongoose.model('vendor', VendorSchema);
module.exports = VendorModel;
