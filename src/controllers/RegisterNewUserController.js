const RegiterNewUserService = require("../services/RegisterNewUserService");
const FindUserService = require("../services/FindUserService");
const regexPatternTovalidateEmail = require("../utils/regex");

class RegiterNewUserController {
  async registerUser(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(406).json({
        message: "Dados inválidos, tente novamente"
      })
    }

    if (password.length <= 6) {
      return res.status(406).json({
        message: "A senha precisa ter mais de 6 caracteres"
      })
    }

    const functionTovalidateEmail = regexPatternTovalidateEmail(email);


    if (!functionTovalidateEmail) {
      return res.status(406).json({
        message: "Por favor, insira um e-mail válido"
      })
    }

    const findUserByEmail = await FindUserService.findByEmail(email);


    if (findUserByEmail.length > 0) {
      return res.status(400).json({
        message: "Já existe uma conta registrada com este e-mail"
      })
    }

    const createNewUser = await RegiterNewUserService.registerNewUser(name, email, password);

    return res.status(200).json({
      message: "Você será redirecionado em breve",
      status: 200
    })

  }

}

module.exports = new RegiterNewUserController();