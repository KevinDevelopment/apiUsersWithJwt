const ListAllUsersService = require("../services/ListAllUsersService");

class ListAllUsersController {

  async listAllUsers(req, res) {
    const listOfUsers = await ListAllUsersService.listUsers();

    return res.status(200).json({
      users: listOfUsers.length <= 0 ? "You do not have any user registered at the moment" : listOfUsers
    });
  }

}

module.exports = new ListAllUsersController();

