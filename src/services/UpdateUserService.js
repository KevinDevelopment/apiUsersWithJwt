const knex = require("../database/connection");

class UpdateUserService {
  async updateUser(id, name, email) {
    try {
      const updateUserFromDatabase = await knex("USERS").update({ name: name, email: email }).where({ id: id });
      return updateUserFromDatabase;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = new UpdateUserService();