"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const cors_1 = __importDefault(require("cors"));
const AuthController_1 = __importDefault(require("../controller/AuthController"));
router.use((0, cors_1.default)());
router.get("/", (req, res) => AuthController_1.default.GetUsers(req, res));
router.get("/user", (req, res) => AuthController_1.default.GetUser(req, res));
router.post("/login/phone_number", (req, res) => AuthController_1.default.LoginWithNumber(req, res));
router.post("/login/email", (req, res) => AuthController_1.default.LoginWithEmail(req, res));
router.post("/register", (req, res) => AuthController_1.default.CreateAccount(req, res));
module.exports = router;
