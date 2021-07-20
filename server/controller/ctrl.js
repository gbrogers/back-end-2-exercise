const Rollbar = require("rollbar");
const houses = require("../db.json");

let houseID = 4;

module.exports = {
  getHouses: (req, res) => {
    res.status(200).send(houses);
  },
  deleteHouse: (req, res) => {
    const index = houses.findIndex((house) => {
      return house.id === +req.params.id;
    });
    if (index === -1) {
      rollbar.error("that id does not exist");
      res.status(400).send({ error: "id was not found" });
    } else {
      houses.splice(index, 1);
      rollbar.info("nice! lets delete that house id");
      res.status(200).send(houses);
    }
  },
  createHouse: (req, res) => {
    const { address, price, imageURL } = req.body;
    const newHouse = {
      id: houseID,
      address,
      price,
      imageURL,
    };

    houses.push(newHouse);
    res.status(200).send(houses);
    houseID++;
  },
  updateHouse: (req, res) => {
    const { type, id } = req.body;
    const index = houses.findIndex((house) => {
      return house.id === +req.params.id;
    });

    if (index === -1) {
      res.status(400).send({ error: "id not found" });
    } else {
      // const specificHousePrice = houses[index].price;
      if (type === "plus") {
        houses[index].price = houses[index].price + 10000;
        res.status(200).send(houses);
      } else if (type === "minus" && houses[index].price >= 10000) {
        houses[index].price = houses[index].price - 10000;
        res.status(200).send(houses);
      } else {
        res.status(400).send({ error: "no luck" });
      }
    }
  },
};
