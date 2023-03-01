const CreateUserService = require("../services/CreateUserService");
const FindUserService = require("../services/FindUserService");
const regexPatternTovalidateEmail = require("../utils/regex");

class CreateUserController {

  async createUser(req, res) {
    const { name, email, password } = req.body;

    if (!name) {
      return res.status(406).json({
        message: "invalid data."
      })
    }

    if (!email) {
      return res.status(406).json({
        message: "invalid data."
      })
    }

    if (!password) {
      return res.status(406).json({
        message: "invalid data."
      })
    }

    const functionTovalidateEmail = regexPatternTovalidateEmail(email);


    if (!functionTovalidateEmail) {
      return res.status(406).json({
        message: "please enter a valid email."
      })
    }

    const findUserByEmail = await FindUserService.findByEmail(email);


    if (findUserByEmail.length > 0) {
      return res.status(400).json({
        message: "already registered user this email."
      })
    }
    

    const createNewUser = await CreateUserService.createUser( name, email, password );

    return res.status(200).json({
      message: "successfully registered user."
    })

  }
}

module.exports = new CreateUserController();