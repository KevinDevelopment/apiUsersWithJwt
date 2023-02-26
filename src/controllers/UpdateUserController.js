const UpdateUserService = require("../services/UpdateUserService");
const FindUserService = require("../services/FindUserService");
const regexPatternTovalidateEmail = require("../utils/regex");

class UpdateUserController {

  async updateUser(req, res) {
    const { id, name, email } = req.body;

    if (!id || !name || !email) {
      return res.status(406).json({
        message: "invalid data"
      })
    }

    const checkIfIdExistsInDatabase = await FindUserService.findById(id);
    console.log(checkIfIdExistsInDatabase);

    if (checkIfIdExistsInDatabase.length <= 0) {
      return res.status(406).json({
        message: "id not found"
      });
    }

    const functionTovalidateEmail = regexPatternTovalidateEmail(email);

    if (!functionTovalidateEmail) {
      return res.status(406).json({
        message: "please enter a valid email."
      })
    }

    const updateUser = await UpdateUserService.updateUser(id, name, email);

    return res.status(200).json({
      message: "User data updated successfully"
    });
  }

}

module.exports = new UpdateUserController();