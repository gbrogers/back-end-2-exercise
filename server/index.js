const express = require("express");
const cors = require("cors");

const app = express();
const controller = require("./controller/ctrl");

app.use(express.json());
app.use(cors());

const port = 4004;

//endpoints
app.get("/api/houses", controller.getHouses);
app.delete("/api/houses/:id", controller.deleteHouse);
app.post("/api/houses", controller.createHouse);
app.put("/api/houses/:id", controller.updateHouse);

app.listen(port, () => {
  console.log(`You are running server on port ${port}`);
});
