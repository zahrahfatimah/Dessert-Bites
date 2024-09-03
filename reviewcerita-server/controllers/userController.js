const{ User } = require('../models')

class userController{
  static async register(req, res, next){
    try {
      const { email, password } = req.body
      
    } catch (error) {
      console.log(error);
      
    }
  }
}

module.exports = userController