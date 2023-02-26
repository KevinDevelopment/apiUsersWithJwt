const PasswordService = require("../services/PasswordService");
const FindUserService = require("../services/FindUserService");
const generateToken = require("../auth/token");

const knex = require("../database/connection");

class UserLoginController {

  async userLogin(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(406).json({
        message: "provide login details"
      })
    }

    const findUserInDatabase = await FindUserService.findByEmail(email);
    console.log(findUserInDatabase);

    if (findUserInDatabase.length <= 0) {
      return res.status(404).json({
        message: "There are no registered users with this email"
      })
    }

    const verifyPasswordInDatabase = await PasswordService.decryptPassword(email, password);

    if (!verifyPasswordInDatabase) {
      return res.status(404).json({
        messsage: "invalid data"
      })
    }

    return res.status(200).json({
      message: "successfully logged in",
      token: generateToken(findUserInDatabase[0].email, findUserInDatabase[0].id)
    });

  }

}

module.exports = new UserLoginController();