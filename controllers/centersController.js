const mongoose = require("mongoose");
const CentersModel = mongoose.model("Centers");

module.exports.ShowAllCenters = async (req, res) => {
  try {
    const allCenters = await CentersModel.find();
    if (allCenters.length) {
      return res.status(200).send({ message: "All Centers", data: allCenters });
    }
    res.send({ message: "No centers found" });
  } catch (error) {
    console.log("show all centers error >> ", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

// getHighCenters
module.exports.GetHighCenters = async (req, res) => {
  try {
    const highCenters = await CentersModel.find({
      isHighCenter: req.body.isHighCenter,
    });

    if (highCenters.length) {
      return res
        .status(200)
        .send({ message: "All Centers", data: highCenters });
    }
    res.send({ message: "No high centers found" });
  } catch (error) {
    console.log("high centers error >> ", error);
    res.status(500).send({ message: "Something went wrong!", error });
  }
};

// findCenterByAddress
module.exports.FindByAddress = async (req, res) => {
  try {
    const address = req.query.address;
    if (!address) {
      return res
        .status(400)
        .send({ message: "Missing address query parameter" });
    }

    // Search for collections with matching address using regular expression
    const collections = await CentersModel.find({
      address: address,
    });

    if (!collections.length) {
      return res
        .status(404)
        .send({ message: "No collections found for this address" });
    }

    res.status(200).send({ message: "Collections found!", collections });
  } catch (error) {
    console.error("Error finding collections:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
