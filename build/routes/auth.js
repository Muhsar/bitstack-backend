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
router.post("/login", (req, res) => AuthController_1.default.Login(req, res));
router.post("/update_account/:matric", (req, res) => AuthController_1.default.UpdateAccount(req, res));
router.post("/create_user", (req, res) => AuthController_1.default.CreateUser(req, res));
module.exports = router;
