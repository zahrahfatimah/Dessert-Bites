const axios = require("axios");
const { User, RecipeInformation } = require("../models");
const { compare } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const { where } = require("sequelize");
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const { GoogleAIFileManager } = require("@google/generative-ai/server");

// const apiKey = process.env.GOOGLE_AI_KEY;
// const genAI = new GoogleGenerativeAI(apiKey);
// const fileManager = new GoogleAIFileManager(apiKey);

class Controller {
  static async googleLogin(req, res, next) {
    try {
      const { google_token } = req.headers;

      const client = new OAuth2Client();

      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
        // audience:
      });

      const payload = ticket.getPayload();
      console.log(payload, "<<<<< payload");

      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          username: payload.email,
          password: "password_google",
        },
        hooks: false,
      });

      const accessToken = signToken({
        id: user.id,
        username: user.username,
        email: user.email,
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
      next(error);
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
      next(error);
    }
  }

  static async addUser(req, res, next) {
    try {
      const { username, email, password, role } = req.body; //(?)

      if (!email || !password) throw { name: "InvalidLogin" };

      const user = await User.create({ username, email, password, role });
      res.status(201).json({
        message: "success create new user",
        user,
      });
    } catch (error) {
      console.log(error);
      next(error);
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
      next(error);
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
      next(error);
    }
  }

  static async deleteRecipe(req, res, next) {
    try {
      const { id } = req.params;

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

      next(error);
    }
  }

  static async getRecipeById(req, res, next) {
    try {
      const { id } = req.params;

      // Validasi apakah id ada dan merupakan angka
      if (!id || isNaN(id)) {
        return res.status(400).json({ error: "Invalid or missing ID" });
      }

      const recipe = await RecipeInformation.findByPk(id);

      if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" });
      }

      res.status(200).json({ recipe });
    } catch (error) {
      console.error("Error fetching recipe:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async updateRecipeById(req, res, next) {
    try {
      const { id } = req.params;
      const { sourceName, pricePerServing, notes, healthScore } = req.body;
      const recipe = await RecipeInformation.findByPk(id);
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      await RecipeInformation.update(
        {
          sourceName,
          pricePerServing,
          notes,
          healthScore,
        },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).json({ message: "succes update notes mu" });
    } catch (error) {
      console.log(error);
      next();
    }
  }
}
module.exports = Controller;
