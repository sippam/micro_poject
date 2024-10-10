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

const convert_time_date = (time) => {
  // Convert the timestamp to a Date object
  const date = new Date(time);

  // Format the date as "DD/MM/YYYY HH:MM:SS"
  const formattedDate = date.toLocaleString("th-TH", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return formattedDate;
};

const broadcastMessage = async (time_stamp, acc, temp, mode) => {
  const message = {
    type: "text",
    text:
      "เครื่องจักรเกิดการสั่นปัญหา!\nเครื่องจักร: " +
      class_machine[mode] +
      "\nความเร็วในการสั่น: " +
      acc +
      "mm/s" +
      "\nอุณหภูมิ: " +
      temp +
      "°C" +
      "\nเวลา: " +
      convert_time_date(time_stamp),
  };

  try {
    await client.broadcast(message);
    console.log("ข้อความถูกส่งไปยังผู้ใช้ทุกคนแล้ว!");
  } catch (err) {
    console.error("เกิดข้อผิดพลาดในการส่งข้อความแบบ Broadcast:", err);
  }
};

module.exports = { broadcastMessage };
