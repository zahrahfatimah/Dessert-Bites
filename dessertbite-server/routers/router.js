const express = require("express");
const router = express.Router();

const Controller = require('../controllers/controller')
const {authentication} = require('../middlewares/authentication')
const erroHandler =require('../middlewares/errorHnadler')

router.post("/google-login", Controller.googleLogin)
router.get("/api/dessert", Controller.home)
router.post("/register", Controller.addUser)
router.post("/login", Controller.login)
router.get("/recipe", Controller.readRecipe)
// router.post("/gemini", Controller.gemini)
router.use(authentication)
router.post("/recipe", Controller.addRecipe)
// router.get("/recipe/:id", Controller.getRecipeById)
router.delete("/recipe/:id", Controller.deleteRecipe)
router.put("/recipe/yes/:id", Controller.updateRecipeById)
router.use(erroHandler)

module.exports = router