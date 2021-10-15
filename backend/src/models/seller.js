const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Goodie = require("./goodie");

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
    // lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email not valid.");
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

sellerSchema.virtual("goodies", {
  ref: "Goodie",
  localField: "_id",
  foreignField: "owner",
});

sellerSchema.methods.toJSON = function () {
  const seller = this;
  const sellerObject = seller.toObject();

  delete sellerObject.password;
  delete sellerObject.tokens;
  return sellerObject;
};

sellerSchema.methods.generateAuthToken = async function () {
  const seller = this;
  const token = jwt.sign({ _id: seller._id.toString() }, "thisislife");

  seller.tokens = seller.tokens.concat({ token });
  await seller.save();

  return token;
};

sellerSchema.statics.findByCredentials = async (email, password) => {
  const seller = await Seller.findOne({ email });

  if (!seller) {
    throw new Error("Unable to log in!");
  }

  const isMatch = await bcrypt.compare(password, seller.password);

  if (!isMatch) {
    throw new Error("Unable to log in!");
  }

  return seller;
};

//Hash the plain text assword
sellerSchema.pre("save", async function (next) {
  const seller = this;

  if (seller.isModified("password")) {
    seller.password = await bcrypt.hash(seller.password, 8);
  }

  next();
});

//Delete the Goodie when seller is removed
sellerSchema.pre("remove", async function (next) {
  const seller = this;
  await Goodie.deleteMany({ owner: seller._id });
  next();
});

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;
