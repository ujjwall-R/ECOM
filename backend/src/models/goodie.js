const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const goodieSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    // default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Seller",
  },
  quantity: {
    type: Number,
    required: true,
    default: 10,
  },
});

goodieSchema.pre("save", async function (next) {
  const goodie = this;

  if (goodie.isModified("password")) {
    goodie.password = await bcrypt.hash(goodie.password, 8);
  }

  next();
});

const Goodie = mongoose.model("Goodie", goodieSchema);

module.exports = Goodie;
