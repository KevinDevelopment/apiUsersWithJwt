const PasswordService = require("../services/PasswordService");
const FindUserService = require("../services/FindUserService");
const generateToken = require("../auth/token");

class UserLoginController {

  async userLogin(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(406).json({
        message: "Por favor, informe os dados de login"
      })
    }

    const findUserInDatabase = await FindUserService.findByEmail(email);

    if (findUserInDatabase.length <= 0) {
      return res.status(404).json({
        message: "Não existem contas associadas ao e-mail informado"
      })
    }

    const verifyPasswordInDatabase = await PasswordService.decryptPassword(email, password);

    if (!verifyPasswordInDatabase) {
      return res.status(404).json({
        message: "Dados inválidos"
      })
    }

    return res.status(200).json({
      message: "Você será redirecionado em breve",
      token: generateToken(findUserInDatabase[0].email, findUserInDatabase[0].id),
    });

  }

}

module.exports = new UserLoginController();