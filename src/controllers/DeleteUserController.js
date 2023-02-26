const DeleteUserService = require("../services/DeleteUserService");
const FindUserService = require("../services/FindUserService");

class DeleteUserController {
  async deleteUser(req, res) {
    const { id } = req.params;

    const findUserInDatabase = await FindUserService.findById(id);

    if (findUserInDatabase.length <= 0) {
      return res.status(406).json({
        message: "id not found"
      })
    }

    const deleteUser = await DeleteUserService.deleteUser(id);
    console.log(deleteUser);

    return res.status(200).json({
      message: "successfully deleted user"
    });

  }
}

module.exports = new DeleteUserController();