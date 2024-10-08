const connection = require("./../db");

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
}

const fecth_all_data = async () => {
  try {
    const [result] = await connection.promise().query("SELECT * FROM `all`");
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { insert_all_date, fecth_all_data };
