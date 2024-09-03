const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) throw { name: "Unauthorized", message: "Authorization header is missing" };

    const accessToken = authorization.split(' ')[1];

    if (!accessToken) throw { name: "Unauthorized", message: "Access token is missing" };

    const payload = verifyToken(accessToken);
    if (!payload) throw { name: "Unauthorized", message: "Invalid access token" };

    const user = await User.findOne({
      where: {
        email: payload.email
      }
    });

    if (!user) throw { name: "Unauthorized", message: "User not found" };

    req.loginInformation = {
      userId: user.id,
      email: user.email,
      password: user.password
    };

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: error.name, message: error.message });
  }
};

module.exports = { authentication };
