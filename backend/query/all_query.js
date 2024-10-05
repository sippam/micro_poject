const connection = require("./../db");

const fecth_all_data = async () => {
  try {
    const [result] = await connection.promise().query("SELECT * FROM `all`");
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { fecth_all_data };
