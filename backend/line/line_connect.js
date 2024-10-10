const line = require("@line/bot-sdk");
require("dotenv").config();

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
};

const client = new line.Client(config);

const class_machine = [
  "เครื่องจักรขนาดเล็ก",
  "เครื่องจักรขนาดกลาง",
  "เครื่องจักรขนาดใหญ่ที่มีฐานยึด",
  "เครื่องจักรขนาดใหญ่ที่มีฐานยืดหยุ่น",
];

const broadcastMessage = async (time_stamp, acc, temp, mode) => {
  const message = {
    type: "text",
    text:
      "เครื่องจักรเกิดการสั่นปัญหา!\nเครื่องจักร: " +
      class_machine[mode] +
      "\nความเร็ซวในการสั่น: " +
      acc +
      "\nอุณหภูมิ: " +
      temp +
      "\nเวลา: " +
      time_stamp,
  };

  try {
    await client.broadcast(message);
    console.log("ข้อความถูกส่งไปยังผู้ใช้ทุกคนแล้ว!");
  } catch (err) {
    console.error("เกิดข้อผิดพลาดในการส่งข้อความแบบ Broadcast:", err);
  }
};

module.exports = { broadcastMessage };
