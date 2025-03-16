const { default: mongoose } = require("mongoose");

const agentSchema = new mongoose.Schema({ agentName: String });

const agentModel = mongoose.model("Agent", agentSchema);

module.exports = agentModel;
