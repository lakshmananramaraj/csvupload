const { default: mongoose } = require("mongoose");

const policyCategorySchema = new mongoose.Schema({ categoryName: String });

const policyCategoryModel = mongoose.model("PolicyCategory", policyCategorySchema);

module.exports = policyCategoryModel;
