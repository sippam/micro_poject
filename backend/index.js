const express = require("express");
const WebSocket = require("ws");
const app = express();
const bodyParser = require("body-parser");
const { insert_all_date, fecth_all_data } = require("./query/all_query");
const { insert_critical_acc, count_critical_acc } = require("./query/acc_query");

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

app.post("/api/send", async (req, res) => {
  const { acc, temp } = req.body;
  const time_stamp = new Date().toISOString('en-US', { timeZone: 'Asia/Bangkok' });

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ time_stamp: time_stamp, acc: acc, temp: temp }));
    }
  });

  const insert_all_data_result = await insert_all_date(time_stamp, acc, temp);
  console.log("Data insert_all_data_result inserted", insert_all_data_result);

  // const data = await insert_critical_acc(time_stamp, acc);
  // console.log("Data inserted", data);
  // const test = await count_critical_acc();
  // console.log("Data count", test);
  
  

  res.status(200).send("Data received");
});

app.listen(PORT, () => {
  console.log(`WebSocket server is running on port ${WS_PORT}`);
  console.log(`Server is running on port : ${PORT}`);
});

module.exports = app;
