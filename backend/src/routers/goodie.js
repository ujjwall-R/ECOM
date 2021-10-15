const express = require("express");
const Goodie = require("../models/goodie");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");

router.post("/goodies", auth, async (req, res) => {
  const goodie = new Goodie({
    ...req.body,
    owner: req.seller._id,
  });
  try {
    await goodie.save();
    res.status(201).send(goodie);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/goodies/:id", auth, async (req, res) => {
  try {
    const goodie = await Goodie.findOneAndDelete({
      _id: req.params.id,
      owner: req.seller._id,
    });
    if (!goodie) {
      return res.status(404).send();
    }
    res.send(goodie);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/goodies", auth, async (req, res) => {
  try {
    // const goodies = await Goodie.find({ owner: req.seller._id });
    await req.seller.populate("goodies");
    res.send(req.seller.goodies);
  } catch (error) {
    res.status(400).send();
  }
});

router.get("/goodies/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const goodie = await Goodie.findOne({ _id, owner: req.seller._id });
    if (!goodie) {
      return res.status(404).send();
    }
    res.send(goodie);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch("/goodies/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["price", "description"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Update" });
  }
  try {
    const goodie = await Goodie.findOne({
      _id: req.params.id,
      owner: req.seller._id,
    });

    if (!goodie) {
      return res.status(404).send();
    }

    updates.forEach((update) => {
      goodie[update] = req.body[update];
    });
    await goodie.save();

    res.send(goodie);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
