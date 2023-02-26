const knex = require("../database/connection");
const FindUserService = require("../services/FindUserService");
const bcrypt = require("bcrypt");

class PasswordService {
  async decryptPassword(email, password) {
    try {
      const listAllUserData = await FindUserService.findByEmail(email)  
      console.log(listAllUserData);    
      const passwordCompare = await bcrypt.compare(password, listAllUserData[0].PASSWORD);
      return passwordCompare;
    } catch (error) {
      console.error(error); 
    }
  }
}

module.exports = new PasswordService();