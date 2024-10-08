const connection = require("../db");

const insert_critical_v_rms = async (time_stamp, acc) => {
  const mysqlTimestamp = new Date(time_stamp)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  try {
    const [result] = await connection
      .promise()
      .query("INSERT INTO `critical_v_rms` (time_stamp, v_rms) VALUES (?, ?)", [
        mysqlTimestamp,
        acc,
      ]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const count_critical_acc = async () => {
  try {
    const [result] = await connection
      .promise()
      .query("SELECT COUNT(*) AS count FROM `critical_acc`");
    return result[0].count;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { insert_critical_v_rms, count_critical_acc };
