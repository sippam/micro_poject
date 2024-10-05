const express = require("express");
const WebSocket = require("ws");
const app = express();
const bodyParser = require("body-parser");
const { fecth_all_data } = require("./query/all_query");

app.use(bodyParser.json());

const wss = new WebSocket.Server({ port: 8080 });
const PORT = 3001;

wss.on("connection", async (ws) => {
  console.log("Client connected");

  const data = await fecth_all_data();
  console.log(data);

  ws.on("message", (message) => {
    console.log(`Received message => ${message}`);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

app.post("/api/send", (req, res) => {
  const { sensor_value } = req.body;

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ sensorValue: sensor_value, tem: 25 }));
    }
  });

  res.status(200).send("Data received");
});

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});

module.exports = app;
