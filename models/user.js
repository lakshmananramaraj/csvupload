const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  dob: String,
  address: String,
  phone: String,
  state: String,
  zipCode: String,
  email: String,
  gender: String,
  userType: String,
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
