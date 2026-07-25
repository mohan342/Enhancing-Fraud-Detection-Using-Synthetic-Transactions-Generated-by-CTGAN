const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../frontend")));

const LOG_FILE = path.join(__dirname, "predictions.json");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

app.post("/predict", (req, res) => {
  const { v1, v2, v3, v4, amount } = req.body;

  const prediction = Math.random() > 0.5 ? "Not Fraud" : "Fraud";

  const record = {
    time: new Date().toISOString(),
    v1,
    v2,
    v3,
    v4,
    amount,
    prediction
  };

  let logs = [];
  if (fs.existsSync(LOG_FILE)) {
    try {
      logs = JSON.parse(fs.readFileSync(LOG_FILE, "utf8"));
    } catch (e) {
      logs = [];
    }
  }
  logs.push(record);
  fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));

  res.json({ result: prediction });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});