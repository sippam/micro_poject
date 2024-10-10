const connection = require("./../db");
const { format } = require("date-fns-tz");

const insert_all_date = async (time_stamp, acc, temp) => {
  const mysqlTimestamp = new Date(time_stamp)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  try {
    const [result] = await connection
      .promise()
      .query("INSERT INTO `all` (time_stamp, acc, temp) VALUES (?, ?, ?)", [
        mysqlTimestamp,
        acc,
        temp,
      ]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const fecth_all_data = async (
  start_date = new Date(new Date().setHours(0, 0, 0, 0)).toISOString("en-US", {
    timezone: "Asia/Bangkok",
  }),
  end_date = new Date(new Date().setHours(23, 59, 59, 999)).toISOString("en-US", {
    timezone: "Asia/Bangkok",
  })
) => {
  console.log("start_date", start_date, "end_date", end_date);
  const start_date_format = format(start_date, "yyyy-MM-dd HH:mm:ssXXX");
  const end_date_format = format(end_date, "yyyy-MM-dd HH:mm:ssXXX");
  try {
    const [result] = await connection
      .promise()
      .query("SELECT * FROM `all` WHERE time_stamp BETWEEN ? AND ?", [
        start_date_format,
        end_date_format,
      ]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const get_min_max_date = async () => {
  try {
    const [result] = await connection
      .promise()
      .query("SELECT MIN(time_stamp) AS min, MAX(time_stamp) AS max FROM `all`");
    return result[0];
  } catch (error) {
    console.log(error);
  }
}

module.exports = { insert_all_date, fecth_all_data, get_min_max_date };
