// user addresss schema.....
const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  type: { type: String, enum: ['billing', 'shipping'], default: 'shipping' },
  fullName: { type: String },
  phone: { type: String },
  country: { type: String },
  city: { type: String },
  state: { type: String },
  postalCode: { type: String },
  addressLine1: { type: String },
  addressLine2: { type: String },
  isDefault: { type: Boolean, default: false }
}, { _id: false });

module.exports = AddressSchema;
