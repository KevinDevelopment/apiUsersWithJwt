const knex = require("../database/connection");
const bcrypt = require("bcrypt");

class CreateUserService {
  async createUser(id, name, email, password) {
    try {
      const encryptedPassword = await bcrypt.hash(password, 10);
      const insertNewUser = await knex("USERS").insert({ id, name, email, password: encryptedPassword });
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = new CreateUserService();