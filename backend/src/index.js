const express = require("express");
var cors = require("cors");

require("./db/mongoose");
const sellerRouter = require("./routers/seller");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(sellerRouter);

app.listen(port, () => {
  console.log("Server is on port", port);
});
