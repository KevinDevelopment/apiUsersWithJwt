const UpdateUserService = require("../services/UpdateUserService");
const FindUserService = require("../services/FindUserService");
const regexPatternTovalidateEmail = require("../utils/regex");

class UpdateUserController {

  async updateUser(req, res) {
    const { id, name, email } = req.body;

    if (!id || !name || !email) {
      return res.status(406).json({
        message: "Dados inválidos"
      })
    }

    const checkIfIdExistsInDatabase = await FindUserService.findById(id);
    console.log(checkIfIdExistsInDatabase);

    if (checkIfIdExistsInDatabase.length <= 0) {
      return res.status(406).json({
        message: "Não existe o Id informado"
      });
    }

    const functionTovalidateEmail = regexPatternTovalidateEmail(email);

    if (!functionTovalidateEmail) {
      return res.status(406).json({
        message: "Por favor, insira um e-mail válido"
      })
    }

    const updateUser = await UpdateUserService.updateUser(id, name, email);

    return res.status(200).json({
      message: "Atualizado com sucesso",
      status: 200
    });
  }

}

module.exports = new UpdateUserController();