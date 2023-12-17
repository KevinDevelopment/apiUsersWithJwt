const knex = require("../database/connection");

class ListAllUsers {
  async listUsers() {
    try {
      const listAllUsersFromDatabase = await knex.select("*").from("Clients");
      return listAllUsersFromDatabase;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = new ListAllUsers();