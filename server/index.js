const express = require("express");
const cors = require("cors");
// const ctrl = require("./controller/ctrl");
const controller = require("./controller/ctrl");

const app = express();

app.use(express.static("public"));
const path = require("path");

app.use(express.json());
app.use(cors());

var Rollbar = require("rollbar");

var rollbar = new Rollbar({
  accessToken: "1c945783b77447a5808a359cafda0954",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

const port = process.env.PORT || 4004;

//endpoints
app.get("/api/houses", controller.getHouses);
app.delete("/api/houses/:id", controller.deleteHouse);
app.post("/api/houses", controller.createHouse);
app.put("/api/houses/:id", controller.updateHouse);

app.listen(port, () => {
  console.log(`You are running server on port ${port}`);
});
