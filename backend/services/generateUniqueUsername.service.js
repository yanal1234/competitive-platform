const db = require("../config/db");

const generateUniqueUsername = async (user_name) => {
  const base_name = user_name.toLocaleLowerCase().replace(/[^a-z0-9]/g, "");
  for (let index = 0; index < 10; index++) {
    const random_number = Math.floor(1000 + Math.random() * 9000);
    const new_name = `${base_name}${random_number}`;
    const [users] = await db.query(
      "SELECT user_id FROM users WHERE username = ?",
      [new_name],
    );

    if (users.length === 0) {
      return new_name;
    }
  }
  throw new Error("Could not generate a unique username");
};
module.exports = { generateUniqueUsername };
