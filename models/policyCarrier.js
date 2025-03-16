const { default: mongoose } = require("mongoose");

const policyCarrierSchema = new mongoose.Schema({ companyName: String });

const policyCarrierModel = mongoose.model("PolicyCarrier", policyCarrierSchema);

module.exports = policyCarrierModel;
