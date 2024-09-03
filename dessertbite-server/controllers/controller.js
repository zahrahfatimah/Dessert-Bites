const axios = require("axios");
const { User, RecipeInformation } = require("../models");
const { compare } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const gemini = require("../helpers/gemini");
// const cloudinary = require('../helpers/claudinary')
const { OAuth2Client } = require("google-auth-library");

class Controller {
  static async googleLogin(req, res, next) {
    try {
      const { google_token } = req.headers;

      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          // username: payload.username,
          email: payload.email,
          password: "password_google",
        },
        hooks: false,
      });

      const accessToken = createToken({
        id: user.id,
        email: user.email,
        // email: user.email
      });

      res.status(200).json({ accessToken });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async home(req, res, next) {
    const options = {
      method: "GET",
      url: "https://the-birthday-cake-db.p.rapidapi.com/",
      headers: {
        "x-rapidapi-key": "2f65806f71msh08642d52c493d1ap15c3adjsn8941a614a5e2",
        "x-rapidapi-host": "the-birthday-cake-db.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      // console.log(response.data);

      const data = response.data.map((ok) => {
        return {
          title: ok.title,
          image: ok.image,
        };
      });

      res.send(data);
    } catch (error) {
      console.error(error);
    }
  }

  static async login(req, res, next) {
    try {
      console.log(req.body);

      const { email, password } = req.body;

      if (!email || !password) throw { name: "InvalidLogin" };

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) throw { name: "LoginError" };

      if (!compare(password, user.password)) throw { name: "LoginError" };

      const payload = {
        // id: user.id,
        email: user.email,
        // role: user.role,
        password: user.password,
      };

      const accessToken = signToken(payload);

      res.status(200).json({
        accessToken,
      });
    } catch (error) {
      console.log(error);
      // next()
    }
  }

  static async addUser(req, res, next) {
    try {
      const { username, email, password, role } = req.body; //(?)

      const user = await User.create({ username, email, password, role });
      res.status(201).json({
        message: "success create new user",
        user,
      });
    } catch (error) {
      console.log(error);
      //  next(error)
    }
  }

  static async readRecipe(req, res, next) {
    try {
      // const { id } = req.params;
      const recipe = await RecipeInformation.findAll();

      // if (!recipe) {
      //   throw { name: "NotFound", id };
      // }

      res.status(200).json({
        message: "Success read recipe information",
        recipe,
      });
      // console.log(recipe, '<<<< di controller');
    } catch (error) {
      console.log(error);
      // next(error)
    }
  }

  static async addRecipe(req, res, next) {
    try {
      const { userId } = req.loginInformation;
      const { sourceName, pricePerServing, notes, healthScore } = req.body;
      const recipe = await RecipeInformation.create({
        sourceName,
        pricePerServing,
        notes,
        healthScore,
        userId,
      });

      res.status(201).json({
        message: "Success create new Recipe",
        recipe,
      });
    } catch (error) {
      console.log(error);
      // next(error)
    }
  }

  static async deleteRecipe(req, res, next) {
    try {
      const { id } = req.params;
      // console.log(req.params, '<<<<<<');

      // console.log(id);
      const recipe = await RecipeInformation.findByPk(id);

      if (!recipe) {
        throw { name: "NotFound", id };
      }

      await RecipeInformation.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: `Success delete recipe with id ${id}`,
      });
    } catch (error) {
      console.log(error);

      // next(error)
    }
  }

  static async uploadDessergt(req, res, next) {
    try {
      const { dessertName } = req.body;
      const data = await gemini(dessertName);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Interna server error",
      });
    }
  }
}
module.exports = Controller;
