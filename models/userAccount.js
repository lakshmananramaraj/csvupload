const { default: mongoose } = require("mongoose");

const userAccountSchema = new mongoose.Schema({ accountName: String });

const userAccountModel = mongoose.model("UserAccount", userAccountSchema);

module.exports = userAccountModel;
