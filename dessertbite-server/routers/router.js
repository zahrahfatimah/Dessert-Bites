const express = require("express");
const router = express.Router();

const Controller = require('../controllers/controller')
const {authentication} = require('../middlewares/authentication')

router.post("/register", Controller.addUser)
router.post("/google-login", Controller.googleLogin)
router.post("/login", Controller.login)
router.get("/api/dessert", Controller.home)
router.get("/recipe", Controller.readRecipe)
router.use(authentication)
router.post("/recipe", Controller.addRecipe)
router.delete("/recipe/:id", Controller.deleteRecipe)
// router.post("/nutritions", Controller.gemini)

module.exports = router