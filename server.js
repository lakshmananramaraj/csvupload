const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const policyRouter = require("./routes/policyRoute");
const messageRouter = require("./routes/messageRoute");

// Task 2
const pm2 = require("pm2");
const os = require("os-utils");
setInterval(() => {
  os.cpuUsage((v) => {
    console.log("CPU Usage (%): " + v * 100);
    if (v * 100 > 70) {
      console.log("CPU usage exceeded 70%, restarting server...");
      pm2.connect((err) => {
        if (err) {
          console.error(err);
          process.exit(2);
        }

        pm2.restart("csvupload", (err) => {
          pm2.disconnect(); // Disconnects from PM2
          if (err) throw err;
          console.log("Server restarted successfully");
        });
      });
    }
  });
}, 5000);

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(
    "provide your mongoDB url"
  )
  .then(() => console.log("DB Connected"));

app.use("/api", policyRouter);
app.use("/api", messageRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
