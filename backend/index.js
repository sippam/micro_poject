const express = require("express");
const WebSocket = require("ws");
const app = express();
const bodyParser = require("body-parser");
const { fecth_all_data } = require("./query/all_query");

app.use(bodyParser.json());

const PORT = 3001;
const WS_PORT = 8080;
const wss = new WebSocket.Server({ port: WS_PORT });

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
  const { acc, temp } = req.body;
  const time_stamp = new Date().toISOString('en-US', { timeZone: 'Asia/Bangkok' });

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ time_stamp: time_stamp, acc: acc, temp: temp }));
    }
  });

  res.status(200).send("Data received");
});

app.listen(PORT, () => {
  console.log(`WebSocket server is running on port ${WS_PORT}`);
  console.log(`Server is running on port : ${PORT}`);
});

module.exports = app;
