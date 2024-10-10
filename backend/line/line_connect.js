const line = require("@line/bot-sdk");
require("dotenv").config();

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
};

const client = new line.Client(config);

const broadcastMessage = async (time_stamp, acc, temp, mode) => {
  const message = {
    type: "text",
    text: "นี่คือข้อความแจ้งเตือนทุกวันที่ส่งถึงผู้ใช้ทุกคน!",
  };

  try {
    await client.broadcast(message);
    console.log("ข้อความถูกส่งไปยังผู้ใช้ทุกคนแล้ว!");
  } catch (err) {
    console.error("เกิดข้อผิดพลาดในการส่งข้อความแบบ Broadcast:", err);
  }
};

module.exports = { broadcastMessage };