import express from "express"
var router = express.Router()
import cors from "cors"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import AuthController from '../controller/AuthController';
router.use(cors())

router.get("/", (req, res)=> AuthController.GetUsers(req, res))
router.post("/login", (req, res)=> AuthController.Login(req, res))
router.post("/update_account/:matric", (req, res)=> AuthController.UpdateAccount(req, res))
router.post("/create_user", (req, res)=> AuthController.CreateUser(req, res))

module.exports = router