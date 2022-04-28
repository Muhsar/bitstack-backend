import express from "express"
var router = express.Router()
import cors from "cors"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import AuthController from '../controller/AuthController';
router.use(cors())

router.get("/", (req, res)=> AuthController.GetUsers(req, res))
router.post("/login/phone_number", (req, res)=> AuthController.LoginWithNumber(req, res))
router.post("/login/email", (req, res)=> AuthController.LoginWithEmail(req, res))
router.post("/register", (req, res)=> AuthController.CreateAccount(req, res))

module.exports = router