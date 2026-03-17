const express = require("express");

const authRouter = express.Router();
const authCOntroller = require("../controller/auth.controller");
/**
 * @route POST /api/auth/register
 * @desc Register a new user
 */

authRouter.post("/register", authCOntroller.registerUserController);

/**
 * @route POST /api/auth/login
 * @desc Login an existing user
 */

authRouter.post("/login", authCOntroller.loginUserController);

/**
 * @route GET /api/auth/logout
 * @desc logout user and blacklist token
 */

authRouter.get("/logout",authCOntroller.logoutController);
module.exports = authRouter;