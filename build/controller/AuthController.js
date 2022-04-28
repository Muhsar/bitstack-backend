"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Users_1 = __importDefault(require("../models/Users"));
const HandleResponse_1 = require("../HandleResponse");
const key = process.env.SECRET_KEY || "secret";
class AuthController {
    static LoginWithNumber(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { phone_number, password } = req.body;
            yield Users_1.default.findOne({ phone_number }).then((user) => {
                if (user) {
                    if (bcryptjs_1.default.compareSync(password, user.password)) {
                        const payload = {
                            userId: user._id,
                            email: user.email,
                            full_name: user.full_name,
                        };
                        let token = jsonwebtoken_1.default.sign(payload, key);
                        (0, HandleResponse_1.HandleResponse)(res, 200, `Login Successful`, "success", token);
                        // res.json(token);
                    }
                    else {
                        (0, HandleResponse_1.HandleResponse)(res, 200, `Passwords do not match`, "error", {});
                        // res.json({ error: "Passwords do not match" });
                    }
                }
                else {
                    (0, HandleResponse_1.HandleResponse)(res, 200, `No user with that phone number`, "error", {});
                    // res.json({
                    //   error: "User does not exist",
                    // });
                }
            });
        });
    }
    static LoginWithEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            yield Users_1.default.findOne({ email }).then((user) => {
                if (user) {
                    if (bcryptjs_1.default.compareSync(password, user.password)) {
                        const payload = {
                            userId: user._id,
                            email: user.email,
                            full_name: user.full_name,
                        };
                        let token = jsonwebtoken_1.default.sign(payload, key);
                        (0, HandleResponse_1.HandleResponse)(res, 200, `Login Successful`, "success", token);
                        // res.json(token);
                    }
                    else {
                        (0, HandleResponse_1.HandleResponse)(res, 200, `Passwords do not match`, "error", {});
                        // res.json({ error: "Passwords do not match" });
                    }
                }
                else {
                    (0, HandleResponse_1.HandleResponse)(res, 200, `No user with that email address`, "error", {});
                }
            });
        });
    }
    // static async UpdateAccount(req, res) {
    //   const { matric } = req.params;
    //   const {password} = req.body
    //   bcrypt.hash(password, 10, (err, hash) => {
    //           Users.findOneAndUpdate({matric}, {
    //             $set: {password: hash}
    //         }, {
    //             new: true,
    //             runValidators: true,
    //             upsert: true,
    //             returnOriginal: false,
    //             returnNewDocument: true
    //         }).exec()
    //         .then((user)=>{
    //           HandleResponse(res, 201, "Account Updated Successfully", user)
    //         })
    //         })
    // }
    static CreateAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, phone_number, password, referral_code } = req.body;
            const NewUser = {
                email,
                phone_number,
                password,
                referral_code,
            };
            yield Users_1.default.findOne({ email })
                .then((user) => {
                if (user) {
                    console.log(user);
                    (0, HandleResponse_1.HandleResponse)(res, 200, `${email} exists already`, "error", user);
                }
                if (!user) {
                    // console.log(users)
                    bcryptjs_1.default.hash(password, 10, (err, hash) => {
                        NewUser.password = hash;
                        Users_1.default.create(NewUser).then(() => {
                            (0, HandleResponse_1.HandleResponse)(res, 200, `${email} added to the user list successfully`, "success", NewUser);
                        });
                    });
                }
            })
                .catch((err) => {
                res.send("error" + err);
            });
        });
    }
    static GetUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // var decode = jwt.verify(req.headers['authorization'], key)
            // res.json({user: decode})
            yield Users_1.default.find().then(users => {
                console.log(users);
                users && res.json({ message: "All users Retrieved Successfully", data: users, total: users.length });
                !users && res.json({ message: "Unexpected Error" });
            });
        });
    }
    static GetUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var decode = jsonwebtoken_1.default.verify(req.headers['authorization'], key);
            // res.json({user: decode})
            yield Users_1.default.findById({ _id: decode === null || decode === void 0 ? void 0 : decode.userId }).then(user => {
                user && (0, HandleResponse_1.HandleResponse)(res, 200, `Data retrieved successfully`, "success", user);
                !user && (0, HandleResponse_1.HandleResponse)(res, 200, `Can't retrieve user`, "error", {});
            });
        });
    }
}
exports.default = AuthController;
