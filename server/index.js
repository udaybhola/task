const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 9000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/timers", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
});

const timerSchema = new mongoose.Schema({
  name: String,
  startTime: Number,
  creationDate: { type: Date, default: Date.now },
  deleteDate: Date,
  activeDuration: Number,
});

const Timer = mongoose.model("Timer", timerSchema);

app.post("/timers", async (req, res) => {
  const timer = new Timer(req.body);
  await timer.save();
  res.send(timer);
});

app.get("/timers", async (req, res) => {
  const timers = await Timer.find();
  res.send(timers);
});

app.delete("/timers/:id", async (req, res) => {
  const timer = await Timer.findById(req.params.id);
  timer.deleteDate = new Date();
  await timer.save();
  res.send(timer);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
