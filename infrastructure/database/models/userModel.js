const mongoose = require("mongoose");
const { parsePhoneNumberFromString } = require("libphonenumber-js");
const AddressSchema = require("./addressSchema"); // importing address schema on the user Model...

const UserSchema = new mongoose.Schema(
  {
    // Basic Info
    name: {
      type: String,
      required: [true, "name is required."],
      minlength: [3, "name should be atleast 3 character long"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
phone: {
  type: String,
  required: [true, 'Phone number is required'],
  validate: {
    validator: function (value) {
      // Reject if contains letters OR spaces
      if (!/^\+?\d+$/.test(value)) return false;

      const phoneNumber = parsePhoneNumberFromString(value, 'IN');
      return phoneNumber && phoneNumber.isValid();
    },
    message: 'Invalid phone number format'
  },
  set: function (value) {
    // Normalize only if valid
    const phoneNumber = parsePhoneNumberFromString(value, 'IN');
    if (phoneNumber && phoneNumber.isValid()) {
      return phoneNumber.number; // E.164 format
    }
    return value;
  }
}

,
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
          return regex.test(value);
        },
        message:
          "Password must be at least 8 chars, contain uppercase, lowercase, number, and special character",
      },
    },

    // User Roles
    role: {
      type: String,
      enum: {
        values: ["customer", "seller", "admin", "support", "delivery", "guest"],
        message: "{VALUE} is not a valid role",
      },
      default: "customer",
      required: true,
    },

    // Addresses
    addresses: [AddressSchema],

    // Wishlist
    wishlist: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        addedAt: { type: Date, default: Date.now },
      },
    ],

    // Order History
    orders: [
      {
        orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
        purchasedAt: { type: Date, default: Date.now },
      },
    ],

    // Cart (optional – depends if you're storing carts in DB)
    cart: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
        addedAt: { type: Date, default: Date.now },
      },
    ],

    // Payment Methods (tokens, not full data)
    paymentMethods: [
      {
        provider: { type: String }, // e.g., stripe, paypal
        token: { type: String },
        last4: { type: String },
        brand: { type: String },
        expiryMonth: Number,
        expiryYear: Number,
      },
    ],

    // Notifications & Preferences
    emailVerified: { type: Boolean, default: false },
    phoneVerified: { type: Boolean, default: false },
    prefersEmail: { type: Boolean, default: true },
    prefersSMS: { type: Boolean, default: false },

    // Account Metadata
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
    registeredAt: { type: Date, default: Date.now },
    profileImage: { type: String }, // URL or path to avatar

    // For security features
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password; // remove password from JSON output
        return ret;
      },
    },
    toObject: {
      transform(doc, ret) {
        delete ret.password; // remove password from Object output
        return ret;
      },
    },
  }, 
  
);

module.exports = mongoose.model("User", UserSchema);
