const express = require("express");
const Seller = require("../models/seller");
const router = new express.Router();
const auth = require("../middleware/auth");

router.post("/sellers/login", async (req, res) => {
  try {
    const seller = await Seller.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await seller.generateAuthToken();
    res.status(200).send({ seller, token });
  } catch (error) {
    res.status(400).send();
  }
});

router.post("/sellers/logout", auth, async (req, res) => {
  try {
    req.seller.tokens = req.seller.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.seller.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/sellers/logoutall", auth, async (req, res) => {
  try {
    req.seller.tokens = [];
    await req.seller.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/test", (req, res) => {
  res.send("From a new file");
});

router.delete("/sellers/me", auth, async (req, res) => {
  try {
    await req.seller.remove();
    res.send(req.seller);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/sellers", async (req, res) => {
  const seller = new Seller(req.body);

  try {
    await seller.save();
    const token = await seller.generateAuthToken();

    res.status(201).send({ seller, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/sellers/me", auth, async (req, res) => {
  res.send(req.seller);
});

router.patch("/sellers/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "age", "password"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates!" });
  }

  try {
    updates.forEach((update) => {
      req.seller[update] = req.body[update];
    });
    await req.seller.save();

    res.send(req.seller);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
