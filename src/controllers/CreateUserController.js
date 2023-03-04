const CreateUserService = require("../services/CreateUserService");
const FindUserService = require("../services/FindUserService");
const regexPatternTovalidateEmail = require("../utils/regex");

class CreateUserController {

  async createUser(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(406).json({
        message: "Invalid data"
      })
    }

    if (password.length <= 6) {
      return res.status(406).json({
        message: "password must be more than 6 characters"
      })
    }

    const functionTovalidateEmail = regexPatternTovalidateEmail(email);


    if (!functionTovalidateEmail) {
      return res.status(406).json({
        message: "Please enter a valid email"
      })
    }

    const findUserByEmail = await FindUserService.findByEmail(email);


    if (findUserByEmail.length > 0) {
      return res.status(400).json({
        message: "Already registered user this email"
      })
    }


    const createNewUser = await CreateUserService.createUser(name, email, password);

    return res.status(200).json({
      message: "Successfully registered user"
    })

  }
}

module.exports = new CreateUserController();