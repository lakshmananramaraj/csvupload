const messageModel = require("../models/message");
const schedule = require("node-schedule");

class message {
  async postScheduleMessage(req, res) {
    const { message, day, time } = req.body;

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const timeRegex = /^([01]\d|2[0-3]):?([0-5]\d)$/;
    if (!dateRegex.test(day)) {
      return res
        .status(500)
        .send("Date invalid. please send in this format yyyy-mm-dd");
    } else if (!timeRegex.test(time)) {
      return res
        .status(500)
        .send("Time invalid. please send in this format HH:mm 24hr like 16:30");
    } else {
      // Combine day and time into a single Date object dayFormat = yyyy/mm/dd time = 16:45 in 24hr format
      const scheduledDate = new Date(`${day}T${time}:00`);
      if (scheduledDate < new Date()) {
        return res
          .status(500)
          .send("Schedule date and time should be above than current time");
      } else {
        // Schedule the insertion
        schedule.scheduleJob(scheduledDate, async () => {
          const newMessage = new messageModel({ message, scheduledDate });
          await newMessage.save();
          console.log(`Message inserted: ${message} at ${scheduledDate}`);
        });

        return res.status(201).send(`Message scheduled for ${scheduledDate}`);
      }
    }
  }
}

const messageContoller = new message();
module.exports = messageContoller;
