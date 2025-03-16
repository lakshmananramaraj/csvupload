const { default: mongoose } = require("mongoose");

const policyInfoSchema = new mongoose.Schema({
    policyNumber: String,
    policyStartDate: String,
    policyEndDate: String,
    categoryId: mongoose.Schema.Types.ObjectId,
    companyId: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId
});

const policyInfoModel = mongoose.model("PolicyInfo", policyInfoSchema);

module.exports = policyInfoModel;