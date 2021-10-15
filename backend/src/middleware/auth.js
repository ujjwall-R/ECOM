const jwt = require("jsonwebtoken");
const Seller = require("../models/seller");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "thisislife");
    console.log(decoded);
    console.log("Current token:", token);
    const seller = await Seller.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!seller) {
      throw new Error();
    }
    req.token = token;
    req.seller = seller;
    next();
    console.log(token);
  } catch (e) {
    console.log(e);
    res.status(401).send({ error: "Please authenticate!" });
  }
};

module.exports = auth;
