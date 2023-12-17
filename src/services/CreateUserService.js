const knex = require("../database/connection");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

class CreateUserService {
  async createUser(name, email, password) {
    try {
      const userId = uuidv4();
      const encryptedPassword = await bcrypt.hash(password, 10);
      const insertNewUser = await knex("user").insert({ id: userId, email, password: encryptedPassword });
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = new CreateUserService();