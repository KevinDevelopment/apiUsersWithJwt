const knex = require("../database/connection");

class FindUserService {
  async findByEmail(email) {
    try {
      const findUserByEmail = await knex.select("*").from("clients").where({ email: email });
      return findUserByEmail;
    } catch (error) {
      console.error(error);
    }
  }

  async findById(id) {
    try {
      const findUserById = await knex.select("*").from("clients").where({ id: id });
      return findUserById;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = new FindUserService();