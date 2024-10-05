const express = require("express");
const WebSocket = require("ws");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const wss = new WebSocket.Server({ port: 8080 });

const PORT = 3001;

wss.on("connection", (ws) => {
  console.log("Client connected");

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
