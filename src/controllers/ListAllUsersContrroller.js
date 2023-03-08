const ListAllUsersService = require("../services/ListAllUsersService");

class ListAllUsersController {

  async listAllUsers(req, res) {
    const listOfUsers = await ListAllUsersService.listUsers();

    return res.status(200).json({
      message: listOfUsers.length <= 0 ? "Não existem usuários cadastrados caro guerreiro!" : listOfUsers
    });
  }

}

module.exports = new ListAllUsersController();

