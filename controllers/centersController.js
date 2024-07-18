const CentersModel = require("../models/centerSchema");

// Show all centers
module.exports.ShowAllCenters = async (req, res) => {
  try {
    const allCenters = await CentersModel.find();
    if (allCenters.length) {
      return res.status(200).send({ message: "All centers", data: allCenters });
    }
    res.status(404).send({ message: "No centers found" });
  } catch (error) {
    console.error("Error fetching all centers:", error);
    res.status(500).send({ message: "Internal server error", error });
  }
};

// Get high centers
module.exports.GetHighCenters = async (req, res) => {
  try {
    const { isHighCenter } = req.query;

    if (typeof isHighCenter === 'undefined') {
      return res.status(400).send({ message: "Missing 'isHighCenter' query parameter" });
    }

    const highCenters = await CentersModel.find({ isHighCenter: isHighCenter === 'true' });

    if (highCenters.length) {
      return res.status(200).send({ message: "High centers", data: highCenters });
    }
    res.status(404).send({ message: "No high centers found" });
  } catch (error) {
    console.error("Error fetching high centers:", error);
    res.status(500).send({ message: "Internal server error", error });
  }
};

// Find center by address
module.exports.FindByAddress = async (req, res) => {
  try {
    const { address } = req.query;

    if (!address) {
      return res.status(400).send({ message: "Missing address query parameter" });
    }

    // Search for collections with matching address using regular expression
    const centers = await CentersModel.find({ address: new RegExp(address, 'i') });

    if (centers.length) {
      return res.status(200).send({ message: "Centers found", data: centers });
    }
    res.status(404).send({ message: "No centers found for this address" });
  } catch (error) {
    console.error("Error finding centers by address:", error);
    res.status(500).send({ message: "Internal server error", error });
  }
};
