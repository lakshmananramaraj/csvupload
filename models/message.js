const { default: mongoose } = require("mongoose");

const messageSchema = new mongoose.Schema({ message: String, scheduledDate: Date }, { timestamps: true });

const messageModel = mongoose.model("Message", messageSchema);

module.exports = messageModel;
