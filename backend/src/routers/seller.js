const express = require("express");
const Seller = require("../models/seller");
const router = new express.Router();
const auth = require("../middleware/auth");

router.get("/check", (req, res) => {
  res.send("Hello");
});

router.post("/sellers/login", async (req, res) => {
  try {
    const seller = await Seller.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await seller.generateAuthToken();
    res.send({ seller, token });
  } catch (error) {
    res.status(400).send();
  }
});

router.delete("/sellers/:id", async (req, res) => {
  try {
    const seller = await Seller.findByIdAndDelete(req.params.id);

    if (!seller) {
      return res.status(404).send();
    }
    res.send(seller);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/sellers", async (req, res) => {
  const seller = new Seller(req.body);
  console.log(req);

  try {
    await seller.save();
    const token = await seller.generateAuthToken();

    res.status(201).send({ seller, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/sellers/me", auth, async (req, res) => {
  res.send(req.seller);
});

router.get("/sellers/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const seller = await Seller.findById(_id);
    if (!seller) {
      return res.status(404).send();
    }
    res.send(seller);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch("/sellers/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["username", "email", "password"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates!!" });
  }

  try {
    const seller = await Seller.findById(req.params.id);

    updates.forEach((update) => {
      seller[update] = req.body[update];
    });
    await seller.save();

    if (!seller) {
      return res.status(404).send();
    }

    res.send(seller);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
