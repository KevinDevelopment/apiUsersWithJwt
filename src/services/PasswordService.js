const knex = require("../database/connection");
const bcrypt = require("bcrypt");
const LoginService = require("./LoginService");

class PasswordService {
  async decryptPassword(email, password) {
    try {
      const listAllUserData = await LoginService.findByEmail(email);  
      const passwordCompare = await bcrypt.compare(password, listAllUserData[0].PASSWORD);
      return passwordCompare;
    } catch (error) {
      console.error(error); 
    }
  }
}

module.exports = new PasswordService();