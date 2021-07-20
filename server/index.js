const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.static("public"));
const path = require("path");

const controller = require("./controller/ctrl");

app.use(express.json());
app.use(cors());

var Rollbar = require("rollbar");
const ctrl = require("./controller/ctrl");
var rollbar = new Rollbar({
  accessToken: "1c945783b77447a5808a359cafda0954",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
  // // send rollbar some info // happens everytime project is loaded
  // rollbar.info("html file served successfully");
});

const port = process.env.PORT || 4004;

//endpoints
app.get("/api/houses", controller.getHouses);
app.delete("/api/houses/:id", controller.deleteHouse);
app.post("/api/houses", ctrl.createHouse);
app.put("/api/houses/:id", controller.updateHouse);

app.listen(port, () => {
  console.log(`You are running server on port ${port}`);
});
