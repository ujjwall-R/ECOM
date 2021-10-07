const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sellerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email not valid!!");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.length <= 6 || value.includes("password")) {
        throw new Error("Password Invalid!");
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
        require: true,
      },
    },
  ],
});

sellerSchema.methods.generateAuthToken = async function () {
  const seller = this;
  const token = jwt.sign({ _id: seller._id.toString() }, "thisislife");

  seller.tokens = seller.tokens.concat({ token });
  await seller.save();

  return token;
};

sellerSchema.statics.findByCredentials = async (email, password) => {
  if (!seller) {
    throw new Error("Unable to login!!");
  }

  const isMatch = await bcrypt.compare(password, seller.password);

  if (!isMatch) {
    throw new Error("Unable to login!!");
  }

  return seller;
};

sellerSchema.pre("save", async function (next) {
  const seller = this;

  if (seller.isModified("password")) {
    seller.password = await bcrypt.hash(seller.password, 8);
  }

  next();
});

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;
