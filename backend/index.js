const express = require("express");
// const WebSocket = require("ws");
const app = express();
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
const {
  insert_all_date,
  // fecth_all_data,
  // get_min_max_date,
} = require("./query/all_query");
const {
  insert_critical_v_rms,
  // count_critical_acc,
} = require("./query/v_rms_query");
const { insert_critical_temp } = require("./query/temp_query");
const {broadcastMessage} = require("./line/line_connect");
app.use(bodyParser.json());

const PORT = 3001;
// const WS_PORT = 8080;
// const wss = new WebSocket.Server({ port: WS_PORT });

// wss.on("connection", async (ws) => {
//   console.log("Client connected");

//   const data = await fecth_all_data();
//   console.log(data);
//   // const wow = await get_min_max_date();
//   // console.log(wow);

//   ws.on("message", (message) => {
//     console.log(`Received message => ${message}`);
//   });

//   ws.on("close", () => {
//     console.log("Client disconnected");
//   });
// });
let last_time_noti = 0;

const set_last_time = (current_time) => {
  current_time_format = new Date(current_time).getTime();

  console.log("last_time_noti", last_time_noti);
  console.log("current_time_format", current_time_format);

  if (current_time_format - last_time_noti > 120000) {
    last_time_noti = current_time_format;
    console.log("Send noti");

    // Line noti
    broadcastMessage();
  }
};

const v_rms_Thresholds = [7.1, 11.2, 18.0, 28.0];
const temp_Thresholds = 45;

const set_mode = (time_stamp, v_rms, temp, mode) => {
  if (v_rms > v_rms_Thresholds[mode]) {
    insert_critical_v_rms(time_stamp, v_rms);
    set_last_time(time_stamp);
  }

  if (temp > temp_Thresholds) {
    insert_critical_temp(time_stamp, temp);
    set_last_time(time_stamp);
  }
};

app.post("/api/send", async (req, res) => {
  const { v_rms, temp, mode } = req.body;
  console.log("v_rms", v_rms, "temp", temp, "mode", mode);

  const time_stamp = new Date().toISOString("en-US", {
    timeZone: "Asia/Bangkok",
  });

  set_mode(time_stamp, v_rms, temp, mode);

  // wss.clients.forEach((client) => {
  //   if (client.readyState === WebSocket.OPEN) {
  //     client.send(
  //       JSON.stringify({ time_stamp: time_stamp, acc: acc, temp: temp })
  //     );
  //   }
  // });

  // Inset to all table
  await insert_all_date(time_stamp, v_rms, temp);
  // console.log("Data insert_all_data_result inserted", insert_all_data_result);

  // const data = await insert_critical_acc(time_stamp, acc);
  // console.log("Data inserted", data);
  // const test = await count_critical_acc();
  // console.log("Data count", test);

  res.status(200).send("Data received");
});

// app.get("/api/range-date", async (req, res) => {
//   const { start_date, end_date } = req.query;
//   const data = await fecth_all_data(start_date, end_date);

//   res.status(200).send(data);
// });

// app.get("/api/min-max-date", async (req, res) => {
//   const data = await get_min_max_date();
//   res.status(200).send(data);
// });

app.listen(PORT, () => {
  // console.log(`WebSocket server is running on port ${WS_PORT}`);
  console.log(`Server is running on port : ${PORT}`);
});

module.exports = app;
