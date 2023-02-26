const knex = require("../database/connection");

class DeleteUserService {
  async deleteUser(id) {
    try {
      const deleteUserFromDatabase = await knex.delete("*").from("USERS").where({id: id});
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = new DeleteUserService();